import { createError, defineEventHandler } from 'h3'
import { pool } from '~/server/utils/postgres'

const formats = ['webp', 'jpg']

const buildOgImage = (slug) => {
    return `/api/image/good/${slug}-256.jpg`
}

const buildGoodDetailsImage = (slug) => {
    const sizes = [
        { responseSize: '414px', imageSize: '500' },
        { responseSize: '0', imageSize: '334' }
    ]

    return formats.flatMap((format) =>
        sizes.map((size) => ({
            srcset: `/api/image/good/${slug}-${size.imageSize}.${format}`,
            media: `screen and (min-width: ${size.responseSize})`,
            type: `image/${format}`
        }))
    )
}

async function getGoodBySlug(slug) {
    const { rows } = await pool.query(
        `SELECT id, slug, name, data FROM catalog_items
         WHERE kind = 'goods' AND slug = $1`,
        [slug]
    )
    if (rows.length === 0) return null
    const { data, ...item } = rows[0]
    return { ...data, ...item }
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const good = await getGoodBySlug(slug)

    if (!good) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Good not found'
        })
    }

    return {
        id: good.id,
        slug: good.slug,
        name: good.name,
        about: good.about,
        images: buildGoodDetailsImage(good.slug),
        meta: {
            ogImage: buildOgImage(good.slug)
        }
    }
})
