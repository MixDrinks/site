import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

export default defineEventHandler(async (event) => {
    const response = {}
    if (!db) {
        response.isDbConnected = false
    } else {
        response.isDbConnected = true
    }
    const safeUsername = event.context?.auth?.username || 'User not logged in'
    response.username = safeUsername
    response.isAuth = !!event.context?.auth?.username
    return response
})
