import { MongoClient, GridFSBucket } from 'mongodb'

const mongoUrl = useRuntimeConfig().mongoUri

const client = new MongoClient(mongoUrl, {
    socketTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000
})

client
    .connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch((e) => {
        console.error('Failed to connect to MongoDB:', e)
        process.exit(1)
    })

export const db = client.db()

export async function connectDB() {
    return db
}

/**
 * Round-trips to the server so callers can tell a live connection from a
 * dead one. Rejects if MongoDB does not answer within `timeoutMs`.
 */
export async function pingDB(timeoutMs = 3000) {
    let timer
    const timeout = new Promise((_, reject) => {
        timer = setTimeout(
            () => reject(new Error('MongoDB ping timed out')),
            timeoutMs
        )
    })
    try {
        await Promise.race([db.command({ ping: 1 }), timeout])
    } finally {
        clearTimeout(timer)
    }
}

let blogImageBucket

/**
 * @returns {Promise<GridFSBucket>}
 */
export async function getBlogImageBucket() {
    await connectDB()
    if (!blogImageBucket) {
        blogImageBucket = new GridFSBucket(db, {
            bucketName: 'blogImages'
        })
    }
    return blogImageBucket
}

let glasswareBucket

/**
 * @returns {Promise<GridFSBucket>}
 */
export async function getGlasswareBucket() {
    await connectDB()
    if (!glasswareBucket) {
        glasswareBucket = new GridFSBucket(db, {
            bucketName: 'glassware-images'
        })
    }
    return glasswareBucket
}

let toolsBucket

/**
 * @returns {Promise<GridFSBucket>}
 */
export async function getToolsBucket() {
    await connectDB()
    if (!toolsBucket) {
        toolsBucket = new GridFSBucket(db, {
            bucketName: 'toolsImages'
        })
    }
    return toolsBucket
}

let goodsBucket

/**
 * @returns {Promise<GridFSBucket>}
 */
export async function getGoodsBucket() {
    await connectDB()
    if (!goodsBucket) {
        goodsBucket = new GridFSBucket(db, {
            bucketName: 'goodsImages'
        })
    }

    return goodsBucket
}

let cocktailBucket

/**
 * @returns {Promise<GridFSBucket>}
 */
export async function getCocktailBucket() {
    await connectDB()
    if (!cocktailBucket) {
        cocktailBucket = new GridFSBucket(db, {
            bucketName: 'cocktailsImages'
        })
    }
    return cocktailBucket
}
