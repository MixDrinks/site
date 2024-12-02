import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

async function getAllCocktails() {
    return db
        .collection('cocktails')
        .find({})
        .project({ name: 1, slug: 1, _id: 0 })
        .toArray()
}

export default defineEventHandler(async () => {
    const cocktails = await getAllCocktails()
    return cocktails
})
