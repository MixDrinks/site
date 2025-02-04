import { MongoClient } from 'mongodb'
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
