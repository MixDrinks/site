import { getGlasswareBucket } from '~/server/utils/mongo'

export default defineEventHandler(async (event) => {
    const name = event.context.params.name

    const bucket = await getGlasswareBucket()
    const readStream = bucket.openDownloadStreamByName(name)
    
    const format = name.split('.').pop()

    setResponseHeaders(event, {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    })
    return readStream
})
