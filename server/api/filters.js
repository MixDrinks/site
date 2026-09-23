import { defineEventHandler } from 'h3'
import { getFilterSnapshot } from '~/server/utils/filters/cache'

const groups = [
    {
        id: 4,
        queryName: 'alcohol-volume',
        name: 'Міцність',
        selectionType: 'SINGLE',
        isOpen: true
    },
    {
        id: 3,
        queryName: 'taste',
        name: 'Смак',
        selectionType: 'MULTIPLE',
        isOpen: false
    },
    {
        id: 1,
        queryName: 'goods',
        name: 'Інгрідієнти',
        selectionType: 'MULTIPLE',
        isOpen: false
    },
    {
        id: 6,
        queryName: 'alcohol',
        name: 'Категорія алкоголю',
        selectionType: 'MULTIPLE',
        isOpen: false
    },
    {
        id: 5,
        queryName: 'glassware',
        name: 'Стакан',
        selectionType: 'SINGLE',
        isOpen: false
    },
    {
        id: 2,
        queryName: 'tools',
        name: 'Приладдя',
        selectionType: 'MULTIPLE',
        isOpen: false
    },
    {
        id: 0,
        queryName: 'tags',
        name: 'Інше',
        selectionType: 'MULTIPLE',
        isOpen: false
    }
]

let cached = null
let cachedFor = null

export default defineEventHandler(async () => {
    const snapshot = await getFilterSnapshot()
    if (cachedFor === snapshot) {
        return cached
    }

    cached = groups.map((group) => ({
        id: group.id,
        queryName: group.queryName,
        name: group.name,
        items: Object.values(snapshot.groups[group.queryName])
            .map((item) => ({
                id: item.id,
                name: item.name,
                slug: item.slug,
                count: item.count
            }))
            .sort((a, b) => b.count - a.count),
        selectionType: group.selectionType,
        isOpen: group.isOpen
    }))
    cachedFor = snapshot

    return cached
})
