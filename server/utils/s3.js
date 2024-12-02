import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import dotenv from 'dotenv'

dotenv.config()

const bucketName = process.env.BUCKET_NAME

const client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    },
    region: process.env.S3_REGION
})

export async function uploadFileToS3(fileData, key, fileType) {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileData,
        ContentType: fileType,
        ACL: 'public-read'
    })

    await client.send(command)
}
