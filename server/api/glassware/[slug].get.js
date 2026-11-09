import { createError, defineEventHandler } from 'h3'
import { pool } from '~/server/utils/postgres'

const formats = ['webp', 'jpg']

const buildOgImage = (slug) => {
    return `/api/image/glassware/${slug}-334.jpg`
}

const buildGlasswareDetailsImage = (slug) => {
    const sizes = [
        { responseSize: '414px', imageSize: '500' },
        { responseSize: '0', imageSize: '334' }
    ]

    return formats.flatMap((format) =>
        sizes.map((size) => ({
            srcset: `/api/image/glassware/${slug}-${size.imageSize}.${format}`,
            media: `screen and (min-width: ${size.responseSize})`,
            type: `image/${format}`
        }))
    )
}

async function getGlasswarebySlug(slug) {
    const { rows } = await pool.query(
        `SELECT id, slug, name, data FROM catalog_items
         WHERE kind = 'glassware' AND slug = $1`,
        [slug]
    )
    if (rows.length === 0) return null
    const { data, ...item } = rows[0]
    return { ...data, ...item }
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const glassware = await getGlasswarebySlug(slug)

    if (!glassware) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Glassware not found'
        })
    }

    return {
        id: glassware.id,
        slug: glassware.slug,
        name: glassware.name,
        about: glassware.about,
        images: buildGlasswareDetailsImage(glassware.slug),
        meta: {
            ogImage: buildOgImage(glassware.slug)
        }
    }
})
