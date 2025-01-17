import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

export default defineEventHandler(async (event) => {
    const key = event.context.params.key
    const image = await db.collection('images').findOne({ key: key })

    event.node.res.setHeader(
        'Content-Type',
        image.contentType || 'application/octet-stream'
    )

    event.node.res.end(image.data.buffer)
})
