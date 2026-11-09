import { pool } from '~/server/utils/postgres'

// Average rating, 0 when the cocktail has not been rated yet.
export const RATING_SCORE_SQL =
    'CASE WHEN rating_count > 0 THEN rating_value / rating_count ELSE 0 END'

const formats = ['webp', 'jpg']

const buildCocktailInListImage = (slug) => {
    const sizes = [
        { responseSize: '414px', imageSize: '300' },
        { responseSize: '0', imageSize: '100' }
    ]

    return formats.flatMap((format) =>
        sizes.map((size) => ({
            srcset: `/api/image/cocktail/${slug}-${size.imageSize}.${format}`,
            media: `screen and (min-width: ${size.responseSize})`,
            type: `image/${format}`
        }))
    )
}

export async function getCocktailsBySlugs(slugs) {
    const { rows: cocktails } = await pool.query(
        `SELECT slug, name,
                visit_count AS "visitCount",
                rating_count AS "ratingCount",
                ${RATING_SCORE_SQL} AS rating
         FROM cocktails
         WHERE slug = ANY($1)
         ORDER BY position`,
        [Array.from(slugs)]
    )

    cocktails.forEach((cocktail) => {
        cocktail.images = buildCocktailInListImage(cocktail.slug)
    })
    return cocktails
}
