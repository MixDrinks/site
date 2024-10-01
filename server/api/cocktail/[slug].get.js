import { defineEventHandler } from 'h3'
import { getFullCocktailBySlug } from '~/server/utils/cocktail/details'

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const cocktail = await getFullCocktailBySlug(slug)

    return cocktail
})
