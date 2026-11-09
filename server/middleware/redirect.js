import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

import { pool } from '~/server/utils/postgres'

const REFRESH_INTERVAL_MS = 5 * 60 * 1000

let redirects = null
let loadedAt = 0
let loading = null

// Redirects are few and rarely change: keep them in memory instead of
// querying the database on every request (including assets and API calls).
async function getRedirects() {
    const isStale = Date.now() - loadedAt > REFRESH_INTERVAL_MS
    if (!loading && (!redirects || isStale)) {
        loading = pool
            .query('SELECT from_path, to_path FROM redirects')
            .then(({ rows }) => {
                redirects = new Map(
                    rows.map((row) => [row.from_path, row.to_path])
                )
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
