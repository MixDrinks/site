import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'
import * as dotenv from 'dotenv'

dotenv.config()

const imageDomain = process.env.IMAGE_DOMAIN

const formats = ['webp', 'jpg']

const buildOgImage = (id) => {
    return `${imageDomain}/goods/${id}/256/${id}.jpg`
}

const buildGlasswareDetailsImage = (slug) => {
    const sizes = [
        { responseSize: '414px', imageSize: '500' },
        { responseSize: '0', imageSize: '334' }
    ]

    return formats.flatMap((format) =>
        sizes.map((size) => ({
            srcset: `${imageDomain}/v2/glasswares/${slug}/${size.imageSize}.${format}`,
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
            ogImage: buildOgImage(glassware.id)
        }
    }
})
