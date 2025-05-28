import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

const imageDomain = useRuntimeConfig().public.imageDomain

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
    return db.collection('glassware').findOne({ slug: slug })
}

export default defineEventHandler(async (req) => {
    const slug = req.context.params.slug

    const glassware = await getGlasswarebySlug(slug)
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
