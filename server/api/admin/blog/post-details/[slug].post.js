import { defineEventHandler, readBody, createError } from 'h3'
import { db } from '~/server/utils/mongo'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineEventHandler(async (req) => {
    const isAuth = req.context?.auth?.username || false
    if (!isAuth) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
    const slug = req.context.params.slug

    const httpBody = await readBody(req)
    const { title, image, tags, body } = httpBody

    console.log('slug', slug)
    console.log('body', body)

    validateBody(body)
    insertOrUpdatePost(slug, title, image, tags || [], body)

    return {
        ok: true
    }
})

function insertOrUpdatePost(slug, title, image, tags, body) {
    return db.collection('blog').updateOne(
        { slug },
        {
            $set: {
                slug,
                title,
                image,
                tags,
                body,
                published_at: new Date()
            }
        },
        { upsert: true }
    )
}

function validateBody(body) {
    if (!Array.isArray(body)) {
        throw new Error('Body must be an array')
    }

    body.forEach((item) => {
        if (typeof item !== 'object') {
            throw new Error('Item must be an object')
        }

        if (!item.type) {
            throw new Error('Item must have a type')
        }

        if (!item.values) {
            throw new Error('Item must have values')
        }

        if (typeof item.values !== 'object') {
            throw new Error('Values must be an object')
        }

        switch (item.type) {
            case 'title_h2':
                validateTitleH2(item.values)
                break
            case 'text':
                validateText(item.values)
                break
            case 'image':
                validateImage(item.values)
                break
            case 'cocktail':
                validateCocktail(item.values)
                break
            case 'cocktail_collection':
                validateCocktailCollection(item.values)
                break
            default:
                throw new Error('Unknown item type')
        }
    })
}

function validateTitleH2(values) {
    if (!values.title) {
        throw new Error('Title must be provided')
    }

    if (typeof values.title !== 'string') {
        throw new Error('Title must be a string')
    }
}

function validateText(values) {
    if (!values.text) {
        throw new Error('Text must be provided')
    }

    if (typeof values.text !== 'string') {
        throw new Error('Text must be a string')
    }
}

function validateImage(values) {
    if (!values.imgUrl) {
        throw new Error('Image URL must be provided')
    }

    if (typeof values.imgUrl !== 'string') {
        throw new Error('Image URL must be a string')
    }
}

function validateCocktail(values) {
    if (!values.slug) {
        throw new Error('Slug must be provided')
    }

    if (typeof values.slug !== 'string') {
        throw new Error('Slug must be a string')
    }
}

function validateCocktailCollection(values) {
    if (!Array.isArray(values.slugs)) {
        throw new Error('Slugs must be an array')
    }

    values.slugs.forEach((slug) => {
        if (typeof slug !== 'string') {
            throw new Error('Slug must be a string')
        }
    })
}
