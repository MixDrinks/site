import { createError } from 'nuxt/app'
import { unref } from 'vue'

/**
 * Turns a failed useAsyncData request into Nuxt's error page (with the API's
 * status code, e.g. 404) instead of letting the page render with null data.
 */
export function throwIfPageError(error) {
    const pageError = unref(error)
    if (pageError) {
        throw createError({
            statusCode: pageError.statusCode || 500,
            statusMessage: pageError.statusMessage,
            fatal: true
        })
    }
}
