import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

import { db } from '~/server/utils/mongo'

const REFRESH_INTERVAL_MS = 5 * 60 * 1000

let redirects = null
let loadedAt = 0
let loading = null

// Redirects are few and rarely change: keep them in memory instead of
// querying MongoDB on every request (including assets and API calls).
async function getRedirects() {
    const isStale = Date.now() - loadedAt > REFRESH_INTERVAL_MS
    if (!loading && (!redirects || isStale)) {
        loading = db
            .collection('redirects')
            .find({}, { projection: { _id: 0, from: 1, to: 1 } })
            .toArray()
            .then((items) => {
                redirects = new Map(items.map((item) => [item.from, item.to]))
                loadedAt = Date.now()
                return redirects
            })
            .finally(() => {
                loading = null
            })
    }
    if (redirects) {
        loading?.catch((error) =>
            console.error('Failed to refresh redirects:', error)
        )
        return redirects
    }
    return loading
}

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)
    const rawPath = url.pathname
    if (rawPath.startsWith('/_nuxt/') || rawPath.startsWith('/api/')) return

    //remove trailing and leading slashes
    const path = rawPath.replace(/\/$/, '').replace(/^\//, '')

    const to = (await getRedirects()).get(path)

    if (to != null) {
        await sendRedirect(event, to)
    }
})
