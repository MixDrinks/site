import { defineEventHandler } from 'h3'
import { handleFilterRequest } from '~/server/utils/filters/request'

export default defineEventHandler((event) => {
    const filterString = event.context.params._ || ''

    const filterPairs = filterString.split('/').filter((pair) => pair !== '')

    const filter = {}
    filterPairs.forEach((pair) => {
        const [key, value] = pair.split('=')
        if (!key || !value) {
            console.warn(`Ignoring malformed filter segment "${pair}"`)
            return
        }
        filter[key] = value.split(',')
    })

    return handleFilterRequest(event, filter)
})
