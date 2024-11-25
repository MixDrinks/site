import { defineEventHandler, readMultipartFormData, createError } from 'h3';
import { uploadFileToS3 } from "~/server/utils/s3";
import { generateSessionId } from '~/server/utils/string';
import { db } from '~/server/utils/mongo'

const s3ImagesPath = 'images';

export default defineEventHandler(async (event) => {
    const isAuth = event.context?.auth?.username || false;
    if (!isAuth) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

    const files = await readMultipartFormData(event);

    if (!files || !files[0]) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No file uploaded',
        });
    }

    const file = files[0];

    const array = file.filename.split('.');
    const fileName = array.slice(0, -1).join('.').replace(/[^a-zA-Z0-9]/g, '-');
    const fileExtension = array[array.length - 1];

    const fileSuffix = generateSessionId(6).toLowerCase();
    const fileKey = `${s3ImagesPath}/${fileName}-${fileSuffix}.${fileExtension}`

    await db
        .collection('images')
        .insertOne({
            key: fileKey,
        });

    try {
        await uploadFileToS3(file.data, fileKey, file.type);
        return {
            success: true,
            message: 'File uploaded successfully',
        };
    } catch (error) {
        console.error('S3 upload error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Error uploading file to S3',
        });
    }
});
