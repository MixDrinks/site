import { defineEventHandler, setResponseStatus, setResponseHeader } from 'h3'
import { pingDB } from '~/server/utils/postgres'

// Used by the container HEALTHCHECK: returns 503 when PostgreSQL is unreachable
// so Docker Swarm marks the task unhealthy and replaces it.
export default defineEventHandler(async (event) => {
    setResponseHeader(event, 'cache-control', 'no-store')
    try {
        await pingDB()
        return { status: 'ok' }
    } catch (error) {
        console.error('Health check failed:', error.message)
        setResponseStatus(event, 503)
        return { status: 'error', error: error.message }
    }
})
