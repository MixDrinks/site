import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { generateSessionId } from '~/server/utils/string'
import { db } from '~/server/utils/mongo'

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

    const fileSuffix = generateSessionId(6).toLowerCase()
    const fileKey = `${fileName}-${fileSuffix}`.toLowerCase()

    const buffer = Buffer.from(file.data)

    try {
        await db.collection('images').insertOne({
            key: fileKey,
            originalFilename: file.filename,
            contentType: file.type,
            data: buffer,
            createdAt: new Date()
        })

        return {
            fileKey: fileKey
        }
    } catch (error) {
        console.error('MongoDB insert error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Error saving file to MongoDB'
        })
    }
})
