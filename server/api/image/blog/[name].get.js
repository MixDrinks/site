import { getBlogImageBucket } from '~/server/utils/mongo'

export default defineEventHandler(async (event) => {
    const name = event.context.params.name

    const bucket = await getBlogImageBucket()
    const readStream = bucket.openDownloadStreamByName(name)

    setResponseHeaders(event, {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    })
    return readStream
})
