import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const username = event.context?.auth?.username
    return {
        isLogin: !!username
    }
})
