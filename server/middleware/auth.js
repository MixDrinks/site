import { defineEventHandler, parseCookies } from 'h3'
import { getUserBySessionId } from '~/server/utils/user'

export default defineEventHandler(async (event) => {
    const cookie = parseCookies(event)
    const sessionId = cookie.sessionId
    const user = await getUserBySessionId(sessionId)

    if (user) {
        event.context.auth = { username: user.username }
    }
})
