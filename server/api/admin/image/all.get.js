import { defineEventHandler, createError } from 'h3'
import { db } from '~/server/utils/mongo'
import * as dotenv from 'dotenv'

dotenv.config()
const imageDomain = process.env.IMAGE_DOMAIN

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
            url: `${imageDomain}/${image.key}`
        }))
    }
})
