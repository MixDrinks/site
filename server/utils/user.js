import { db } from '~/server/utils/mongo'
import { compareSync } from 'bcrypt'
import { generateSessionId } from '~/server/utils/string'

export async function addSessionToUser(username, password) {
    const user = await db.collection('users').findOne({ username: username })

    if (!user) {
        return {
            error: 'Invalid username or password'
        }
    }

    const match = compareSync(password, user.password)

    if (!match) {
        return {
            error: 'Invalid username or password'
        }
    }

    const sessionId = generateSessionId(64)

    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    await db.collection('users').updateOne(
        { username: username },
        {
            $push: {
                sessions: {
                    sessionId: sessionId,
                    expiresAt: expiresAt
                }
            }
        }
    )

    return {
        sessionId: sessionId,
        expiresAt: expiresAt
    }
}

export async function getUserBySessionId(sessionId) {
    return await db.collection('users').findOne({
        sessions: {
            $elemMatch: {
                sessionId: sessionId,
                expiresAt: {
                    $gt: new Date()
                }
            }
        }
    })
}
