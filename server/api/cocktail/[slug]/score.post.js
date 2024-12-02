import { defineEventHandler, readBody } from 'h3'
import { db } from '~/server/utils/mongo'

async function addRatingToCocktail(slug, rating) {
    return db.collection('cocktails').updateOne(
        {
            slug: slug
        },
        {
            $inc: {
                ratingCount: 1,
                ratingValue: rating
            }
        }
    )
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug
    const body = await readBody(req)
    const { value } = body

    const rattingInfo = await addRatingToCocktail(slug, value)

    if (!rattingInfo) {
        return {
            error: 'Cocktail not found'
        }
    } else {
        return { slug: slug }
    }
})
