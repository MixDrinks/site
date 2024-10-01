import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'
import { getFullCocktailBySlug } from '~/server/utils/cocktail/details'
import * as dotenv from 'dotenv'

dotenv.config()

const imageDomain = process.env.IMAGE_DOMAIN

async function getBlockPost(slug) {
    return db
        .collection('blog')
        .findOne({ slug: slug })
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const response = await getBlockPost(slug)

    for (let i = 0; i < response.body.length; i++) {
        if (response.body[i].type === 'cocktail') {
            const cocktailSlug = response.body[i].values.slug;
            try {
                response.body[i].values = await getFullCocktailBySlug(cocktailSlug)
            } catch (error) {
                console.error(`Failed to get cocktail details for slug ${cocktailSlug}: ${error}`);
            }
        }

        if (response.body[i].type === 'image') {
            response.body[i].values.imgUrl = `${imageDomain}/${response.body[i].values.imgUrl}`
        }
    }

    return response;
})
