import { defineEventHandler, createError } from 'h3'
import { db } from '~/server/utils/mongo'

export default defineEventHandler(async (event) => {
    const isAuth = event.context?.auth?.username || false
    if (!isAuth) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
    const images = await db.collection('images').find().toArray()
    return {
        images: images.map((image) => ({
            url: `api/image/${image.key}`
        }))
    }
})
