import { pool } from '~/server/utils/postgres'
import { compareSync } from 'bcrypt'
import { generateSessionId } from '~/server/utils/string'

export async function addSessionToUser(username, password) {
    if (typeof username !== 'string' || typeof password !== 'string') {
        return {
            error: 'Invalid username or password'
        }
    }

    const { rows } = await pool.query(
        'SELECT password_hash FROM users WHERE username = $1',
        [username]
    )
    const user = rows[0]

    if (!user) {
        return {
            error: 'Invalid username or password'
        }
    }

    const match = compareSync(password, user.password_hash)

    if (!match) {
        return {
            error: 'Invalid username or password'
        }
    }

    const sessionId = generateSessionId(64)

    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    await pool.query(
        `INSERT INTO user_sessions (session_id, username, expires_at)
         VALUES ($1, $2, $3)`,
        [sessionId, username, expiresAt]
    )

    return {
        sessionId: sessionId,
        expiresAt: expiresAt
    }
}

export async function getUserBySessionId(sessionId) {
    const { rows } = await pool.query(
        `SELECT username FROM user_sessions
         WHERE session_id = $1 AND expires_at > now()`,
        [sessionId]
    )
    return rows[0] || null
}
