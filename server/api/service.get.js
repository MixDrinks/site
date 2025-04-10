import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'
import { getCommitSha } from '~~/server/utils/config'

export default defineEventHandler(async (event) => {
    const response = {}
    if (!db) {
        response.isDbConnected = false
    } else {
        response.isDbConnected = true
    }
    let commitSha = 'init unknown'

    try {
        commitSha = getCommitSha()
    } catch (e) {
        console.error(e)
        commitSha = `Error getting commit sha ${e}`
    }

    const safeUsername = event.context?.auth?.username || 'User not logged in'
    response.username = safeUsername
    response.isAuth = !!event.context?.auth?.username
    response.commitSha = commitSha
    return response
})
