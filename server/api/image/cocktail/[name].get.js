import { createError, defineEventHandler, setResponseHeaders } from 'h3'
import { getImage, imageBuckets } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
    const name = event.context.params.name

    const image = await getImage(imageBuckets.cocktail, name)

    if (!image) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Image not found'
        })
    }

    const format = name.split('.').pop()

    setResponseHeaders(event, {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=31536000, immutable' // Cache for 1 year
    })
    return image.data
})
