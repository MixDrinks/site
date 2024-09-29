import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.DB_URL

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
