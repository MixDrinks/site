import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

async function addVisitToCocktail(slug) {
    return db.collection('cocktails').updateOne(
        {
            'slug': slug
        },
        {
            $inc: {
                'visitCount': 1
            }
        }
    );
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const scoreInfo = await addVisitToCocktail(slug);

    if (!scoreInfo) {
        return {
            error: 'Cocktail not found'
        }
    } else {
        return { 'slug': slug }
    }
})
