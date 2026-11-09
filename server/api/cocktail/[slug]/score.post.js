import { defineEventHandler, readBody, createError } from 'h3'
import { pool } from '~/server/utils/postgres'

async function addRatingToCocktail(slug, rating) {
    const { rowCount } = await pool.query(
        `UPDATE cocktails
         SET rating_count = rating_count + 1, rating_value = rating_value + $2
         WHERE slug = $1`,
        [slug, rating]
    )
    return rowCount > 0
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug
    const body = await readBody(req)
    const value = body?.value

    if (!Number.isInteger(value) || value < 1 || value > 5) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Rating must be an integer from 1 to 5'
        })
    }

    const isUpdated = await addRatingToCocktail(slug, value)

    if (!isUpdated) {
        return {
            error: 'Cocktail not found'
        }
    } else {
        return { slug: slug }
    }
})
