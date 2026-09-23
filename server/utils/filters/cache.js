import { db } from '~/server/utils/mongo'

// Filter group query name -> MongoDB collection holding its items.
export const filterGroups = {
    'alcohol-volume': 'alcoholVolumes',
    taste: 'tastes',
    glassware: 'glassware',
    goods: 'goods',
    tools: 'tools',
    tags: 'tags',
    alcohol: 'alcohol'
}

const REFRESH_INTERVAL_MS = 10 * 60 * 1000

let snapshot = null
let loadedAt = 0
let loading = null

export function popcount(bits) {
    let count = 0
    for (let i = 0; i < bits.length; i++) {
        let v = bits[i]
        v = v - ((v >>> 1) & 0x55555555)
        v = (v & 0x33333333) + ((v >>> 2) & 0x33333333)
        count += (((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24
    }
    return count
}

async function loadSnapshot() {
    const [totalCount, ...collections] = await Promise.all([
        db.collection('cocktails').countDocuments(),
        ...Object.values(filterGroups).map((collection) =>
            db
                .collection(collection)
                .find(
                    {},
                    {
                        projection: {
                            _id: 0,
                            id: 1,
                            slug: 1,
                            name: 1,
                            cocktailSlugs: 1
                        }
                    }
                )
                .toArray()
        )
    ])

    // Every cocktail referenced by a filter gets a bit index, so an item's
    // cocktails are stored as a bitset and filter combinations become cheap
    // bitwise ANDs instead of string Set lookups.
    const slugs = []
    const slugIndex = new Map()
    collections.forEach((items) =>
        items.forEach((item) =>
            (item.cocktailSlugs || []).forEach((slug) => {
                if (!slugIndex.has(slug)) {
                    slugIndex.set(slug, slugs.length)
                    slugs.push(slug)
                }
            })
        )
    )
    const words = Math.ceil(slugs.length / 32)

    // groups[queryName][slug] = { id, slug, name, count, bits }
    const groups = {}
    Object.keys(filterGroups).forEach((queryName, index) => {
        groups[queryName] = {}
        collections[index].forEach((item) => {
            const bits = new Uint32Array(words)
            new Set(item.cocktailSlugs || []).forEach((slug) => {
                const bit = slugIndex.get(slug)
                bits[bit >>> 5] |= 1 << (bit & 31)
            })
            groups[queryName][item.slug] = {
                id: item.id,
                slug: item.slug,
                name: item.name,
                count: popcount(bits),
                bits
            }
        })
    })

    return { totalCount, groups, slugs, emptyBits: new Uint32Array(words) }
}

/**
 * Returns the in-memory filter snapshot, loading it on first use and
 * refreshing it in the background once it is older than the refresh interval.
 * A failed load is retried on the next call instead of leaving the cache empty.
 */
export async function getFilterSnapshot() {
    const isStale = Date.now() - loadedAt > REFRESH_INTERVAL_MS

    if (!loading && (!snapshot || isStale)) {
        loading = loadSnapshot()
            .then((result) => {
                snapshot = result
                loadedAt = Date.now()
                return result
            })
            .catch((error) => {
                console.error('Failed to load filter cache:', error)
                throw error
            })
            .finally(() => {
                loading = null
            })
    }

    // Serve the previous snapshot while a refresh is in flight.
    if (snapshot) {
        loading?.catch(() => {})
        return snapshot
    }

    return loading
}
