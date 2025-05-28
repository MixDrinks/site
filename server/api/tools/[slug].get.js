import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

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
    return db.collection('tools').findOne({ slug: slug })
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const tool = await getToolBySlug(slug)
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
