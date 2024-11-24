import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

export default defineEventHandler(async (event) => {
    const response = {}
    const username = event.context?.auth?.username
    return {
        isLogin: !!username,
    }
})
