import { getQuery } from 'h3'
import { getCocktailFilterState } from '~/server/utils/filters/filters'
import { DescriptionBuilder } from '~/server/utils/filters/description'

const PAGE_SIZE = 24
const MAX_PAGE = 1000

function parsePage(value) {
    const page = Number.parseInt(value, 10)
    if (!Number.isFinite(page) || page < 0) return 0
    return Math.min(page, MAX_PAGE)
}

export async function handleFilterRequest(event, filter) {
    const query = getQuery(event)
    const isRequestHasQuery = Object.keys(query).length > 0

    const sortType = query.sort || 'most-popular'
    const start = parsePage(query.page) * PAGE_SIZE

    const response = await getCocktailFilterState(
        filter,
        start,
        PAGE_SIZE,
        sortType
    )

    if (isRequestHasQuery) {
        response.isAddToIndex = false
    }

    const description = await new DescriptionBuilder().buildDescription(filter)

    if (description) {
        response.description = description
    }

    return response
}
