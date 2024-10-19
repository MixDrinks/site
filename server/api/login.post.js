import { defineEventHandler, readBody, setCookie, setResponseStatus } from 'h3'
import { addSessionToUser } from '~/server/utils/user'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, password } = body

    console.log('username:', username)

    const { sessionId, expiresAt, error } = await addSessionToUser(
        username,
        password
    )

    if (error) {
        setResponseStatus(event, 401)
        return {
            error: 'Invalid username or password'
        }
    }

    if (sessionId && expiresAt) {
        setCookie(event, 'sessionId', sessionId)
        return {
            status: 'success'
        }
    }

    setResponseStatus(event, 401)
    return {
        error: 'An error occurred'
    }
})
