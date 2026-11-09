import { createError, defineEventHandler, setResponseHeaders } from 'h3'
import { getImage, imageBuckets } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
    const name = event.context.params.name

    const image = await getImage(imageBuckets.glassware, name)

    if (!image) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Image not found'
        })
    }

    const format = name.split('.').pop()

    setResponseHeaders(event, {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    })
    return image.data
})
