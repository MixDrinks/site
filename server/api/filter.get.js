import { defineEventHandler, getQuery } from 'h3'
import { getCocktailFilterState } from '~/server/utils/filters/filters'
import { DescriptionBuilder } from '~/server/utils/filters/description'

export default defineEventHandler(async (req) => {
    const query = getQuery(req)
    const isRequestHasQuery = Object.keys(query).length > 0

    const sortType = query.sort || 'most-popular';

    const page = query.page || 0;
    const start = page * 24;
    const limit = 24;

    const response = await getCocktailFilterState({}, start, limit, sortType);

    if (isRequestHasQuery) {
        response.isAddToIndex = false;
    }

    const descriptionBuilder = new DescriptionBuilder();
    const description = await descriptionBuilder.buildDescription({});

    if (description) {
        response.description = description;
    }

    return response;
})
