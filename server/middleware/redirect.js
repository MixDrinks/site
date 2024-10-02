import { defineEventHandler, getRequestURL } from 'h3'
import { sendRedirect } from 'h3';
import { db } from '~/server/utils/mongo'

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event);
    const rawPath = url.pathname
    //remove trailing and leading slashes
    const path = rawPath.replace(/\/$/, '').replace(/^\//, '')

    const to = await db.collection('redirects')
        .findOne({ from: path })

    if (to != null) {
        await sendRedirect(event, to.to)
    }
})
