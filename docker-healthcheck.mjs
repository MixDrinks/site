// Container health probe: the API health endpoint (MongoDB reachable) and the
// main page (SSR renders) must both answer 200 within the timeout.
const port = process.env.PORT || 3000
const base = `http://127.0.0.1:${port}`

async function check(path) {
    const response = await fetch(base + path, {
        signal: AbortSignal.timeout(8000),
        redirect: 'manual'
    })
    if (response.status !== 200) {
        throw new Error(`${path} responded ${response.status}`)
    }
}

try {
    await check('/api/health')
    await check('/')
    process.exit(0)
} catch (error) {
    console.error('Healthcheck failed:', error.message)
    process.exit(1)
}
