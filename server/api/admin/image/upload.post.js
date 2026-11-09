import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { generateSessionId } from '~/server/utils/string'
import { imageBuckets, saveImage } from '~/server/utils/postgres'

export default defineEventHandler(async (event) => {
    const isAuth = event.context?.auth?.username || false
    if (!isAuth) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const files = await readMultipartFormData(event)

    if (!files || !files[0]) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No file uploaded'
        })
    }

    const file = files[0]

    const array = file.filename.split('.')
    const fileName = array
        .slice(0, -1)
        .join('.')
        .replace(/[^a-zA-Z0-9]/g, '-')

    const format = array.pop()

    const fileSuffix = generateSessionId(6).toLowerCase()
    const fileKey = `${fileName}-${fileSuffix}.${format}`.toLowerCase()

    const buffer = Buffer.from(file.data)

    await saveImage(imageBuckets.blog, fileKey, file.type || null, buffer, {
        originalFilename: file.filename,
        createdAt: new Date()
    })

    return {
        fileKey: fileKey
    }
})
