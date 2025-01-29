import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'
import { getFullCocktailBySlug } from '~/server/utils/cocktail/details'
import { getCocktailsBySlugs } from '~~/server/utils/cocktail/list'
import { useRuntimeConfig } from 'nuxt/app'

const imageDomain = useRuntimeConfig().public.imageDomain

async function getBlogPost(slug) {
    return db.collection('blog').findOne({ slug: slug })
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const response = await getBlogPost(slug)

    response.image = `${imageDomain}/${response.image}`
    for (let i = 0; i < response.body.length; i++) {
        if (response.body[i].type === 'cocktail') {
            const cocktailSlug = response.body[i].values.slug
            try {
                response.body[i].values =
                    await getFullCocktailBySlug(cocktailSlug)
            } catch (error) {
                console.error(
                    `Failed to get cocktail details for slug ${cocktailSlug}: ${error}`
                )
            }
        }

        if (response.body[i].type === 'image') {
            response.body[i].values.imgUrl =
                `${imageDomain}/${response.body[i].values.imgUrl}`
        }

        if (response.body[i].type === 'cocktail_collection') {
            const cocktails = await getCocktailsBySlugs(
                response.body[i].values.slugs
            )
            response.body[i].values = cocktails
        }
    }

    const tags = response.tags.map((tag) => {
        return {
            slug: tag.slug,
            name: tag.name
        }
    })

    response.tags = tags

    return response
})
