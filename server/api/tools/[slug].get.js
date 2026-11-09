import { createError, defineEventHandler } from 'h3'
import { pool } from '~/server/utils/postgres'

const formats = ['webp', 'jpg']

const buildOgImage = (slug) => {
    return `/api/image/goods/${slug}-256.jpg`
}

const buildToolDetailsImage = (slug) => {
    const sizes = [
        { responseSize: '414px', imageSize: '500' },
        { responseSize: '0', imageSize: '334' }
    ]

    return formats.flatMap((format) =>
        sizes.map((size) => ({
            srcset: `/api/image/tool/${slug}-${size.imageSize}.${format}`,
            media: `screen and (min-width: ${size.responseSize})`,
            type: `image/${format}`
        }))
    )
}

async function getToolBySlug(slug) {
    const { rows } = await pool.query(
        `SELECT id, slug, name, data FROM catalog_items
         WHERE kind = 'tools' AND slug = $1`,
        [slug]
    )
    if (rows.length === 0) return null
    const { data, ...item } = rows[0]
    return { ...data, ...item }
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const tool = await getToolBySlug(slug)

    if (!tool) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Tool not found'
        })
    }

    return {
        id: tool.id,
        slug: tool.slug,
        name: tool.name,
        about: tool.about,
        images: buildToolDetailsImage(tool.slug),
        meta: {
            ogImage: buildOgImage(tool.id)
        }
    }
})
