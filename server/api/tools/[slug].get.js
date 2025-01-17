import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

const imageDomain = useRuntimeConfig().public.imageDomain

const formats = ['webp', 'jpg']

const buildOgImage = (id) => {
    return `${imageDomain}/goods/${id}/256/${id}.jpg`
}

const buildToolDetailsImage = (slug) => {
    const sizes = [
        { responseSize: '414px', imageSize: '500' },
        { responseSize: '0', imageSize: '334' }
    ]

    return formats.flatMap((format) =>
        sizes.map((size) => ({
            srcset: `${imageDomain}/v2/tools/${slug}/${size.imageSize}.${format}`,
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
