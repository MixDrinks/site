import pg from 'pg'

export const pool = new pg.Pool({
    connectionString: useRuntimeConfig().postgresUri,
    max: 10,
    connectionTimeoutMillis: 10000,
    statement_timeout: 10000,
    idle_in_transaction_session_timeout: 10000
})

// An idle client losing its connection must not crash the process; the pool
// discards it and opens a new one on the next query.
pool.on('error', (error) => {
    console.error('PostgreSQL idle client error:', error.message)
})

pool.query('SELECT 1')
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((e) => {
        console.error('Failed to connect to PostgreSQL:', e)
        process.exit(1)
    })

/**
 * Round-trips to the server so callers can tell a live connection from a
 * dead one. Rejects if PostgreSQL does not answer within `timeoutMs`.
 */
export async function pingDB(timeoutMs = 3000) {
    let timer
    const timeout = new Promise((_, reject) => {
        timer = setTimeout(
            () => reject(new Error('PostgreSQL ping timed out')),
            timeoutMs
        )
    })
    try {
        await Promise.race([pool.query('SELECT 1'), timeout])
    } finally {
        clearTimeout(timer)
    }
}

// Former GridFS bucket names, kept so stored data maps 1:1.
export const imageBuckets = {
    blog: 'blogImages',
    cocktail: 'cocktailsImages',
    glassware: 'glassware-images',
    good: 'goodsImages',
    tool: 'toolsImages'
}

/**
 * @returns {Promise<{ data: Buffer, contentType: string | null } | null>}
 */
export async function getImage(bucket, name) {
    const { rows } = await pool.query(
        'SELECT data, content_type FROM images WHERE bucket = $1 AND name = $2',
        [bucket, name]
    )
    if (rows.length === 0) return null
    return { data: rows[0].data, contentType: rows[0].content_type }
}

export async function listImageNames(bucket) {
    const { rows } = await pool.query(
        'SELECT name FROM images WHERE bucket = $1 ORDER BY uploaded_at',
        [bucket]
    )
    return rows.map((row) => row.name)
}

export async function saveImage(bucket, name, contentType, data, metadata) {
    await pool.query(
        `INSERT INTO images (bucket, name, content_type, data, metadata)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (bucket, name) DO UPDATE
         SET content_type = EXCLUDED.content_type,
             data = EXCLUDED.data,
             metadata = EXCLUDED.metadata,
             uploaded_at = now()`,
        [bucket, name, contentType, data, metadata]
    )
}

// Rebuilds the document shape the API used to get from MongoDB.
export function cocktailFromRow(row) {
    return {
        ...row.data,
        id: row.id,
        slug: row.slug,
        name: row.name,
        visitCount: row.visit_count,
        ratingCount: row.rating_count,
        ratingValue: row.rating_value
    }
}
