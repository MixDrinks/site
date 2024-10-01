import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

export default defineEventHandler(async () => {
    const response = {}
    if (!db) {
        response.isDbConnected = false
    } else {
        response.isDbConnected = true
    }
    return response
})
