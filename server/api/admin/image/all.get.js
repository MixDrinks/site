import { defineEventHandler, createError } from 'h3'
import { db, getBlogImageBucket } from '~/server/utils/mongo'

export default defineEventHandler(async (event) => {
    const isAuth = event.context?.auth?.username || false
    if (!isAuth) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
    const bucket = await getBlogImageBucket()
    const allImages = await bucket.find().toArray()
    return {
        images: allImages.map((image) => ({
            url: `api/image/${image.filename}`
        }))
    }
})
