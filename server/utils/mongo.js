import { MongoClient, GridFSBucket } from 'mongodb'
import { getConfig } from '~/server/utils/config'

const mongoUrl = getConfig().mongoUri

const client = new MongoClient(mongoUrl, {
    socketTimeoutMS: 10000,
    connectTimeoutMS: 10000
})

client
    .connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch((e) => {
        console.error('Failed to connect to MongoDB:', e)
        process.exit(1)
    })

export const db = client.db()

let client2
let db2

export async function connectDB() {
    if (!client2) {
        try {
            client2 = new MongoClient(mongoUrl)
            await client2.connect()
            console.log('Connected to MongoDB')
        } catch (error) {
            console.error('Failed to connect to MongoDB', error)
            throw error
        }
    }
    if (!db2) {
        db2 = client2.db()
    }
    return db2
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