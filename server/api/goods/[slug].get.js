import { defineEventHandler } from 'h3'

import { db } from '~/server/utils/mongo'

const imageDomain = useRuntimeConfig().public.imageDomain

const formats = ['webp', 'jpg']

const buildOgImage = (id) => {
    return `${imageDomain}/goods/${id}/256/${id}.jpg`
}

const buildGoodDetailsImage = (slug) => {
    const sizes = [
        { responseSize: '414px', imageSize: '500' },
        { responseSize: '0', imageSize: '334' }
    ]

    return formats.flatMap((format) =>
        sizes.map((size) => ({
            srcset: `${imageDomain}/v2/goods/${slug}/${size.imageSize}.${format}`,
            media: `screen and (min-width: ${size.responseSize})`,
            type: `image/${format}`
        }))
    )
}

async function getGoodBySlug(slug) {
    return db.collection('goods').findOne({ slug: slug })
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const good = await getGoodBySlug(slug)
    return {
        id: good.id,
        slug: good.slug,
        name: good.name,
        about: good.about,
        images: buildGoodDetailsImage(good.slug),
        meta: {
            ogImage: buildOgImage(good.id)
        }
    }
})
