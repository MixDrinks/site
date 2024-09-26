import { defineEventHandler } from 'h3'
import { db } from '../utils/mongo'

export default defineEventHandler(async () => {
    const response = {}
    if (!db) {
        response.isDbConnected = false
    } else {
        response.isDbConnected = true
    }
    return response
})
