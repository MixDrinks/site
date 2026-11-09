import { createError, defineEventHandler, setResponseHeaders } from 'h3'
import { getImage, imageBuckets } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
    const name = event.context.params.name

    const image = await getImage(imageBuckets.blog, name)

    if (!image) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Image not found'
        })
    }

    setResponseHeaders(event, {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    })
    return image.data
})
