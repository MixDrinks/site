import { defineEventHandler, getQuery } from 'h3'
import { getCocktailFilterState } from '~/server/utils/filters/filters'
import { DescriptionBuilder } from '~/server/utils/filters/description'

export default defineEventHandler(async (req) => {
    const filterString = req.context.params._
    const filterPairs = filterString.split('/');

    const query = getQuery(req)
    const isRequestHasQuery = Object.keys(query).length > 0

    const sortType = query.sort;

    const page = query.page || 0;
    const start = page * 24;
    const limit = 24;

    const filter = {};
    try {
        filterPairs.forEach(pair => {
            const [key, value] = pair.split('=');
            filter[key] = value.split(',');
        });
    } catch (e) {
    }

    const response = await getCocktailFilterState(filter, start, limit, sortType);

    console.log('filter', filter)

    if (isRequestHasQuery) {
        response.isAddToIndex = false;
    }

    const descriptionBuilder = new DescriptionBuilder();
    const description = await descriptionBuilder.buildDescription(filter);

    if (description) {
        response.description = description;
    }

    return response;
})
