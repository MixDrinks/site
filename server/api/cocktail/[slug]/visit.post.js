import { defineEventHandler } from 'h3'
import { pool } from '~/server/utils/postgres'

async function addVisitToCocktail(slug) {
    const { rowCount } = await pool.query(
        'UPDATE cocktails SET visit_count = visit_count + 1 WHERE slug = $1',
        [slug]
    )
    return rowCount > 0
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const isUpdated = await addVisitToCocktail(slug)

    if (!isUpdated) {
        return {
            error: 'Cocktail not found'
        }
    } else {
        return { slug: slug }
    }
})
