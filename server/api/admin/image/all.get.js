import { defineEventHandler, createError } from 'h3'
import { imageBuckets, listImageNames } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
    const isAuth = event.context?.auth?.username || false
    if (!isAuth) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
    const names = await listImageNames(imageBuckets.blog)
    return {
        images: names.map((name) => ({
            url: `api/image/${name}`
        }))
    }
})
