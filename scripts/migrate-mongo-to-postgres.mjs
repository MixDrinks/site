// One-off copy of every MongoDB collection the site uses into PostgreSQL.
//
//   MONGO_URI=mongodb://... POSTGRES_URI=postgres://... \
//       node scripts/migrate-mongo-to-postgres.mjs [--dry-run]
//
// Creates the schema (db/schema.sql), empties the target tables and copies
// everything inside ONE transaction, then compares row counts against MongoDB
// before committing. Any data problem aborts with nothing written, so the
// script can simply be fixed and re-run. --dry-run does all of it and rolls back.

import { readFile } from 'node:fs/promises'
import { MongoClient } from 'mongodb'
import pg from 'pg'

const dryRun = process.argv.includes('--dry-run')
const { MONGO_URI, POSTGRES_URI } = process.env
if (!MONGO_URI || !POSTGRES_URI) {
    console.error('MONGO_URI and POSTGRES_URI must be set')
    process.exit(1)
}

// MongoDB collection -> catalog_items.kind (same name). `alcoholVolume` is
// what the sitemap reads; it is copied too if it exists.
const CATALOG_COLLECTIONS = [
    'alcoholVolumes',
    'alcoholVolume',
    'tastes',
    'glassware',
    'goods',
    'tools',
    'tags',
    'alcohol'
]
const IMAGE_BUCKETS = [
    'blogImages',
    'cocktailsImages',
    'glassware-images',
    'goodsImages',
    'toolsImages'
]
const DOCUMENT_COLLECTIONS = [
    'cocktails',
    ...CATALOG_COLLECTIONS,
    'blog',
    'blogTags',
    'redirects',
    'users'
]
const TABLES = [
    'user_sessions',
    'users',
    'cocktails',
    'catalog_items',
    'blog_posts',
    'blog_tags',
    'redirects',
    'images'
]

const problems = []

// BSON -> plain JSON (ObjectId -> hex string, Date -> ISO string, ...).
function toJson(value) {
    return value === undefined ? null : JSON.parse(JSON.stringify(value))
}

function rest(doc, ...keys) {
    const copy = { ...doc }
    delete copy._id
    keys.forEach((key) => delete copy[key])
    return toJson(copy)
}

function checkUnique(collection, docs, key) {
    const seen = new Set()
    docs.forEach((doc) => {
        if (seen.has(doc[key])) {
            problems.push(`${collection}: duplicate ${key} "${doc[key]}"`)
        }
        seen.add(doc[key])
    })
}

function checkSlug(collection, doc) {
    if (typeof doc.slug !== 'string' || doc.slug === '') {
        problems.push(`${collection} ${doc._id}: missing slug`)
        return false
    }
    return true
}

function intOrNull(collection, doc, key, required) {
    const value = doc[key]
    if (value === undefined || value === null) {
        if (required) problems.push(`${collection} ${doc.slug}: missing ${key}`)
        return null
    }
    const number = Number(value)
    if (!Number.isInteger(number)) {
        problems.push(
            `${collection} ${doc.slug}: ${key} is not an integer (${value})`
        )
        return null
    }
    return number
}

function finiteOrZero(collection, doc, key) {
    const value = doc[key] ?? 0
    const number = Number(value)
    if (!Number.isFinite(number)) {
        problems.push(
            `${collection} ${doc.slug}: ${key} is not a number (${value})`
        )
        return 0
    }
    return number
}

// Multi-row INSERTs: one round trip per batch instead of per row. Rows are
// inserted in array order, so identity `position` keeps MongoDB's order.
async function insertRows(client, table, columns, rows, suffix = '') {
    let batch = []
    let batchBytes = 0
    const flush = async () => {
        if (batch.length === 0) return
        const params = []
        const values = batch.map(
            (row) => `(${row.map((v) => `$${params.push(v)}`).join(', ')})`
        )
        await client.query(
            `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${values.join(', ')} ${suffix}`,
            params
        )
        batch = []
        batchBytes = 0
    }
    for (const row of rows) {
        batch.push(row)
        batchBytes += row.reduce(
            (acc, v) => acc + (Buffer.isBuffer(v) ? v.length : 64),
            0
        )
        if (batch.length >= 500 || batchBytes >= 4e6) await flush()
    }
    await flush()
}

async function copyCocktails(mongo, client) {
    const docs = await mongo.collection('cocktails').find().toArray()
    checkUnique('cocktails', docs, 'slug')
    const rows = []
    for (const doc of docs) {
        if (!checkSlug('cocktails', doc)) continue
        const id = intOrNull('cocktails', doc, 'id', true)
        if (id === null) continue // reported; keep collecting other problems
        rows.push([
            doc.slug,
            id,
            doc.name ?? null,
            intOrNull('cocktails', doc, 'visitCount', false) ?? 0,
            intOrNull('cocktails', doc, 'ratingCount', false) ?? 0,
            finiteOrZero('cocktails', doc, 'ratingValue'),
            rest(
                doc,
                'slug',
                'id',
                'name',
                'visitCount',
                'ratingCount',
                'ratingValue'
            )
        ])
    }
    await insertRows(
        client,
        'cocktails',
        [
            'slug',
            'id',
            'name',
            'visit_count',
            'rating_count',
            'rating_value',
            'data'
        ],
        rows,
        'ON CONFLICT DO NOTHING'
    )
    return docs.length
}

async function copyCatalog(mongo, client, collection) {
    const docs = await mongo.collection(collection).find().toArray()
    checkUnique(collection, docs, 'slug')
    const rows = []
    for (const doc of docs) {
        if (!checkSlug(collection, doc)) continue
        const slugs = doc.cocktailSlugs ?? []
        if (!Array.isArray(slugs) || slugs.some((s) => typeof s !== 'string')) {
            problems.push(
                `${collection} ${doc.slug}: cocktailSlugs is not a string array`
            )
        }
        rows.push([
            collection,
            doc.slug,
            intOrNull(collection, doc, 'id', false),
            doc.name ?? null,
            Array.isArray(slugs) ? slugs.map(String) : [],
            rest(doc, 'slug', 'id', 'name', 'cocktailSlugs')
        ])
    }
    await insertRows(
        client,
        'catalog_items',
        ['kind', 'slug', 'id', 'name', 'cocktail_slugs', 'data'],
        rows,
        'ON CONFLICT DO NOTHING'
    )
    return docs.length
}

async function copyBlog(mongo, client) {
    const posts = await mongo.collection('blog').find().toArray()
    checkUnique('blog', posts, 'slug')
    await insertRows(
        client,
        'blog_posts',
        ['slug', 'title', 'data'],
        posts
            .filter((doc) => checkSlug('blog', doc))
            .map((doc) => [
                doc.slug,
                doc.title ?? null,
                rest(doc, 'slug', 'title')
            ]),
        'ON CONFLICT DO NOTHING'
    )

    const tags = await mongo.collection('blogTags').find().toArray()
    checkUnique('blogTags', tags, 'slug')
    await insertRows(
        client,
        'blog_tags',
        ['slug', 'name', 'data'],
        tags
            .filter((doc) => checkSlug('blogTags', doc))
            .map((doc) => [
                doc.slug,
                doc.name ?? null,
                rest(doc, 'slug', 'name')
            ]),
        'ON CONFLICT DO NOTHING'
    )
    return { blog: posts.length, blogTags: tags.length }
}

async function copyRedirects(mongo, client) {
    const docs = await mongo.collection('redirects').find().toArray()
    // The site kept redirects in a Map, so a later duplicate `from` won.
    const redirects = new Map()
    for (const doc of docs) {
        if (typeof doc.from !== 'string' || doc.to == null) {
            problems.push(`redirects ${doc._id}: missing from/to`)
            continue
        }
        redirects.set(doc.from, String(doc.to))
    }
    await insertRows(
        client,
        'redirects',
        ['from_path', 'to_path'],
        [...redirects.entries()]
    )
    return new Set(docs.map((doc) => doc.from)).size
}

async function copyUsers(mongo, client) {
    const docs = await mongo.collection('users').find().toArray()
    checkUnique('users', docs, 'username')
    const users = []
    const sessions = []
    for (const doc of docs) {
        if (
            typeof doc.username !== 'string' ||
            typeof doc.password !== 'string'
        ) {
            problems.push(`users ${doc._id}: missing username/password`)
            continue
        }
        users.push([
            doc.username,
            doc.password,
            rest(doc, 'username', 'password', 'sessions')
        ])
        // Only still-valid sessions are worth keeping logged in.
        for (const session of doc.sessions ?? []) {
            const expiresAt = new Date(session.expiresAt)
            if (!session.sessionId || !(expiresAt > new Date())) continue
            sessions.push([session.sessionId, doc.username, expiresAt])
        }
    }
    await insertRows(
        client,
        'users',
        ['username', 'password_hash', 'data'],
        users,
        'ON CONFLICT DO NOTHING'
    )
    await insertRows(
        client,
        'user_sessions',
        ['session_id', 'username', 'expires_at'],
        sessions,
        'ON CONFLICT DO NOTHING'
    )
    return { users: docs.length, sessions: sessions.length }
}

// Streams a whole GridFS bucket through ONE chunks cursor (ordered by the
// files_id_1_n_1 index) instead of one download per file.
async function copyImages(mongo, client, bucketName) {
    const files = await mongo
        .collection(`${bucketName}.files`)
        .find()
        .sort({ uploadDate: 1, _id: 1 })
        .toArray()
    // For a re-uploaded filename the newest revision wins, matching GridFS
    // openDownloadStreamByName().
    const latest = new Map()
    files.forEach((file) => latest.set(file.filename, file))
    const wanted = new Map(
        [...latest.values()].map((file) => [String(file._id), file])
    )

    const rows = []
    let bytes = 0
    const finish = (file, parts) => {
        const data = Buffer.concat(parts)
        if (data.length !== file.length) {
            problems.push(
                `${bucketName}/${file.filename}: read ${data.length} of ${file.length} bytes`
            )
        }
        bytes += data.length
        rows.push([
            bucketName,
            file.filename,
            file.contentType ?? file.metadata?.contentType ?? null,
            data,
            toJson(file.metadata ?? {}),
            file.uploadDate ?? new Date()
        ])
        wanted.delete(String(file._id))
    }

    const cursor = mongo
        .collection(`${bucketName}.chunks`)
        .find({}, { projection: { files_id: 1, n: 1, data: 1 } })
        .sort({ files_id: 1, n: 1 })
        .batchSize(500)
    let current = null
    let parts = []
    for await (const chunk of cursor) {
        const id = String(chunk.files_id)
        if (current?.id !== id) {
            if (current?.file) finish(current.file, parts)
            current = { id, file: wanted.get(id) }
            parts = []
        }
        if (!current.file) continue // older revision or orphaned chunk
        if (chunk.n !== parts.length) {
            problems.push(
                `${bucketName}/${current.file.filename}: missing chunk ${parts.length}`
            )
        }
        parts.push(chunk.data.buffer)
    }
    if (current?.file) finish(current.file, parts)
    // Zero-length files have no chunks at all.
    for (const file of [...wanted.values()]) {
        if (file.length === 0) finish(file, [])
        else problems.push(`${bucketName}/${file.filename}: no chunks found`)
    }

    await insertRows(
        client,
        'images',
        ['bucket', 'name', 'content_type', 'data', 'metadata', 'uploaded_at'],
        rows
    )
    return {
        files: latest.size,
        megabytes: Math.round(bytes / 1e5) / 10
    }
}

async function count(client, sql, params = []) {
    const { rows } = await client.query(sql, params)
    return Number(rows[0].count)
}

async function main() {
    const mongoClient = await MongoClient.connect(MONGO_URI)
    const mongo = mongoClient.db()
    const pgClient = new pg.Client({ connectionString: POSTGRES_URI })
    await pgClient.connect()

    try {
        const existing = (await mongo.listCollections().toArray()).map(
            (c) => c.name
        )
        const known = new Set([
            ...DOCUMENT_COLLECTIONS,
            ...IMAGE_BUCKETS.flatMap((b) => [`${b}.files`, `${b}.chunks`])
        ])
        const skipped = existing.filter(
            (name) => !known.has(name) && !name.startsWith('system.')
        )
        if (skipped.length > 0) {
            console.warn(
                `Not migrated (not used by the site): ${skipped.join(', ')}`
            )
        }

        await pgClient.query('BEGIN')
        await pgClient.query(
            await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8')
        )
        await pgClient.query(`TRUNCATE ${TABLES.join(', ')} RESTART IDENTITY`)

        const expected = {}
        expected.cocktails = await copyCocktails(mongo, pgClient)
        for (const collection of CATALOG_COLLECTIONS) {
            expected[collection] = await copyCatalog(
                mongo,
                pgClient,
                collection
            )
        }
        Object.assign(expected, await copyBlog(mongo, pgClient))
        expected.redirects = await copyRedirects(mongo, pgClient)
        const { users, sessions } = await copyUsers(mongo, pgClient)
        expected.users = users
        console.log(`Kept ${sessions} unexpired admin sessions`)
        for (const bucket of IMAGE_BUCKETS) {
            const { files, megabytes } = await copyImages(
                mongo,
                pgClient,
                bucket
            )
            expected[bucket] = files
            console.log(`Copied ${bucket}: ${files} files, ${megabytes} MB`)
        }

        const actual = {
            cocktails: await count(pgClient, 'SELECT count(*) FROM cocktails'),
            blog: await count(pgClient, 'SELECT count(*) FROM blog_posts'),
            blogTags: await count(pgClient, 'SELECT count(*) FROM blog_tags'),
            redirects: await count(pgClient, 'SELECT count(*) FROM redirects'),
            users: await count(pgClient, 'SELECT count(*) FROM users')
        }
        for (const collection of CATALOG_COLLECTIONS) {
            actual[collection] = await count(
                pgClient,
                'SELECT count(*) FROM catalog_items WHERE kind = $1',
                [collection]
            )
        }
        for (const bucket of IMAGE_BUCKETS) {
            actual[bucket] = await count(
                pgClient,
                'SELECT count(*) FROM images WHERE bucket = $1',
                [bucket]
            )
        }

        console.log('\n  collection            mongo   postgres')
        for (const key of Object.keys(expected)) {
            const ok = expected[key] === actual[key]
            if (!ok)
                problems.push(
                    `${key}: ${expected[key]} in MongoDB, ${actual[key]} in PostgreSQL`
                )
            console.log(
                `${ok ? ' ' : '!'} ${key.padEnd(20)} ${String(expected[key]).padStart(6)} ${String(actual[key]).padStart(10)}`
            )
        }

        if (problems.length > 0) {
            await pgClient.query('ROLLBACK')
            console.error(
                `\nAborted, nothing was written. ${problems.length} problem(s):`
            )
            problems.forEach((p) => console.error(`  - ${p}`))
            process.exitCode = 1
        } else if (dryRun) {
            await pgClient.query('ROLLBACK')
            console.log(
                '\nDry run OK: everything copied and verified, then rolled back.'
            )
        } else {
            await pgClient.query('COMMIT')
            console.log('\nMigration committed.')
        }
    } catch (error) {
        await pgClient.query('ROLLBACK').catch(() => {})
        throw error
    } finally {
        await pgClient.end()
        await mongoClient.close()
    }
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
