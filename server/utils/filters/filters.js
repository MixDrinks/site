import { db } from '~/server/utils/mongo'
import {
    filterGroups,
    getFilterSnapshot,
    popcount
} from '~/server/utils/filters/cache'

const formats = ['webp', 'jpg']
const buildCocktailInListImage = (slug) => {
    const sizes = [
        { responseSize: '414px', imageSize: '300' },
        { responseSize: '0', imageSize: '100' }
    ]

    return formats.flatMap((format) =>
        sizes.map((size) => ({
            srcset: `/api/image/cocktail/${slug}-${size.imageSize}.${format}`,
            media: `screen and (min-width: ${size.responseSize})`,
            type: `image/${format}`
        }))
    )
}

const SINGLE_SELECTION_GROUPS = ['alcohol-volume', 'glassware']
/**
 * Drops unknown filter groups and duplicate values so a malformed URL can not
 * break the handler; unknown values inside a known group simply match nothing.
 */
export function normalizeFilters(rawFilters) {
    const filters = {}
    Object.entries(rawFilters).forEach(([group, values]) => {
        if (!filterGroups[group]) return
        const unique = [...new Set(values.filter((value) => value !== ''))]
        if (unique.length > 0) filters[group] = unique
    })
    return filters
}

function getItemCocktails(snapshot, group, slug) {
    return snapshot.groups[group][slug]?.bits || snapshot.emptyBits
}

// ANDs `base` (null means "every cocktail") with each bitset in `sets`.
function intersect(base, sets) {
    if (sets.length === 0) return base
    const result = Uint32Array.from(base || sets[0])
    for (const set of sets) {
        for (let i = 0; i < result.length; i++) result[i] &= set[i]
    }
    return result
}

function countIntersection(base, set) {
    if (base === null) return popcount(set)
    let count = 0
    for (let i = 0; i < set.length; i++) {
        let v = base[i] & set[i]
        v = v - ((v >>> 1) & 0x55555555)
        v = (v & 0x33333333) + ((v >>> 2) & 0x33333333)
        count += (((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24
    }
    return count
}

function bitsToSlugs(snapshot, bits) {
    const slugs = []
    for (let word = 0; word < bits.length; word++) {
        let v = bits[word]
        while (v !== 0) {
            const low = v & -v
            slugs.push(snapshot.slugs[(word << 5) + 31 - Math.clz32(low)])
            v ^= low
        }
    }
    return slugs
}

// Bitset of cocktails matching every selected value, optionally ignoring one
// group. Returns null when nothing constrains the result (i.e. all cocktails match).
function getMatchingBits(snapshot, filters, excludeGroup = null) {
    const sets = []
    Object.entries(filters).forEach(([group, values]) => {
        if (group === excludeGroup) return
        values.forEach((slug) =>
            sets.push(getItemCocktails(snapshot, group, slug))
        )
    })
    return intersect(null, sets)
}

function selectedCount(filters) {
    return Object.values(filters).reduce(
        (acc, values) => acc + values.length,
        0
    )
}

async function getCocktailSubsetByFilter(
    matchingSlugs,
    skip,
    limit,
    sortType = 'most-popular'
) {
    let cocktails

    const matchStage = {
        $match: matchingSlugs === null ? {} : { slug: { $in: matchingSlugs } }
    }

    const addFieldsStage = {
        $addFields: {
            ratingScore: {
                $cond: {
                    if: { $gt: [{ $ifNull: ['$ratingCount', 0] }, 0] }, // Check if ratingCount > 0, else default to 0
                    then: {
                        $divide: [
                            { $ifNull: ['$ratingValue', 0] },
                            { $ifNull: ['$ratingCount', 1] }
                        ]
                    }, // Safely divide ratingValue by ratingCount, default to 0/1
                    else: 0 // If ratingCount is 0 or missing, set ratingScore to 0
                }
            }
        }
    }

    const sortStage = {
        $sort:
            sortType === 'most-popular'
                ? { visitCount: -1, id: -1 }
                : { ratingScore: -1, ratingCount: -1, visitCount: -1, id: -1 }
    }

    const projectStage = {
        $project: {
            _id: 0,
            id: 1,
            slug: 1,
            name: 1,
            visitCount: 1,
            ratingScore: 1,
            ratingCount: 1
        }
    }

    cocktails = await db
        .collection('cocktails')
        .aggregate([
            matchStage,
            addFieldsStage,
            sortStage,
            { $skip: skip },
            { $limit: limit },
            projectStage
        ])
        .toArray()

    cocktails.forEach((cocktail) => {
        cocktail.rating = cocktail.ratingScore
        cocktail.images = buildCocktailInListImage(cocktail.slug)

        delete cocktail.ratingScore
    })

    return cocktails
}

function filterToPath(filters) {
    return Object.keys(filters)
        .sort()
        .filter((group) => filters[group].length > 0)
        .map((group) => `${group}=${[...filters[group]].sort().join(',')}`)
        .join('/')
}

function buildFutureCounter(snapshot, filters, group) {
    const isSingle = SINGLE_SELECTION_GROUPS.includes(group)
    const current = filters[group] || []
    const otherGroups = { ...filters }
    delete otherGroups[group]

    // Cocktails matching every other group; the group itself is varied below.
    const others = getMatchingBits(snapshot, filters, group)
    // ...and additionally every value already selected in this group.
    const othersWithCurrent = isSingle
        ? others
        : intersect(
              others,
              current.map((slug) => getItemCocktails(snapshot, group, slug))
          )

    return Object.values(snapshot.groups[group])
        .map((item) => {
            const isInclude = current.includes(item.slug)

            let nextValues
            if (isSingle) {
                nextValues = isInclude ? [] : [item.slug]
            } else {
                nextValues = isInclude
                    ? current.filter((slug) => slug !== item.slug)
                    : [...current, item.slug]
            }

            const futureFilter = { ...otherGroups }
            if (nextValues.length > 0) futureFilter[group] = nextValues

            if (Object.keys(futureFilter).length === 0) {
                return {
                    id: item.id,
                    query: '',
                    count: snapshot.totalCount,
                    isActive: true,
                    isAddToIndex: false
                }
            }

            let count
            if (!isInclude) {
                count = countIntersection(othersWithCurrent, item.bits)
            } else if (isSingle) {
                count = others === null ? snapshot.totalCount : popcount(others)
            } else {
                // Deselecting a value: recompute the group without it.
                const rest = intersect(
                    others,
                    nextValues.map((slug) =>
                        getItemCocktails(snapshot, group, slug)
                    )
                )
                count = rest === null ? snapshot.totalCount : popcount(rest)
            }

            return {
                id: item.id,
                query: filterToPath(futureFilter),
                count: count,
                isActive: isInclude,
                isAddToIndex: selectedCount(futureFilter) < 3
            }
        })
        .sort((a, b) => b.count - a.count)
}

export async function getCocktailFilterState(
    rawFilters,
    skip,
    limit,
    sortType
) {
    const filters = normalizeFilters(rawFilters)
    const snapshot = await getFilterSnapshot()
    const matchingBits = getMatchingBits(snapshot, filters)

    const totalCount =
        matchingBits === null ? snapshot.totalCount : popcount(matchingBits)

    const cocktails =
        totalCount === 0
            ? []
            : await getCocktailSubsetByFilter(
                  matchingBits && bitsToSlugs(snapshot, matchingBits),
                  skip,
                  limit,
                  sortType
              )

    const futureCounts = {}
    const groupIds = {
        tags: 0,
        goods: 1,
        tools: 2,
        taste: 3,
        'alcohol-volume': 4,
        glassware: 5,
        alcohol: 6
    }
    Object.entries(groupIds).forEach(([group, id]) => {
        futureCounts[id] = buildFutureCounter(snapshot, filters, group)
    })

    return {
        totalCount,
        cocktails,
        futureCounts,
        isAddToIndex: selectedCount(filters) < 3
    }
}
