import { defineEventHandler } from 'h3'
import { connectDB } from '~/server/utils/mongo'

async function getAllCocktailsSlug() {
    const db = await connectDB()
    return db
        .collection('cocktails')
        .find()
        .project({ slug: 1, _id: 0 })
        .toArray()
}

async function getAllToolsSlug() {
    const db = await connectDB()
    return db.collection('tools').find().project({ slug: 1, _id: 0 }).toArray()
}

async function getAllGoodsSlug() {
    const db = await connectDB()
    return db.collection('goods').find().project({ slug: 1, _id: 0 }).toArray()
}

async function getAllGlasswareSlug() {
    const db = await connectDB()
    return db
        .collection('glassware')
        .find()
        .project({ slug: 1, _id: 0 })
        .toArray()
}

async function getAllTagsSlug() {
    const db = await connectDB()
    return db.collection('tags').find().project({ slug: 1, _id: 0 }).toArray()
}

async function getAllTastesSlug() {
    const db = await connectDB()
    return db.collection('tastes').find().project({ slug: 1, _id: 0 }).toArray()
}

async function getAllAlcoholVolumeSlug() {
    const db = await connectDB()
    return db
        .collection('alcoholVolume')
        .find()
        .project({ slug: 1, _id: 0 })
        .toArray()
}

async function getAllAlcoholSlugs() {
    const db = await connectDB()
    return db
        .collection('alcohol')
        .find()
        .project({ slug: 1, _id: 0 })
        .toArray()
}

export default defineEventHandler(async () => {
    const cocktails = (await getAllCocktailsSlug()).map(
        (cocktail) => `cocktails/${cocktail.slug}`
    )
    const goods = (await getAllGoodsSlug()).map((good) => `goods/${good.slug}`)
    const tools = (await getAllToolsSlug()).map((tool) => `tools/${tool.slug}`)
    const glassware = (await getAllGlasswareSlug()).map(
        (glass) => `glassware/${glass.slug}`
    )
    const tagsFilter = (await getAllTagsSlug()).map((tag) => `tags=${tag.slug}`)
    const goodsFilter = (await getAllGoodsSlug()).map(
        (good) => `goods=${good.slug}`
    )
    const toolsFilter = (await getAllToolsSlug()).map(
        (tool) => `tools=${tool.slug}`
    )
    const tastsFilter = (await getAllTastesSlug()).map(
        (tag) => `taste=${tag.slug}`
    )
    const alcoholVolumeFilter = (await getAllAlcoholVolumeSlug()).map(
        (tag) => `alcohol-volume=${tag.slug}`
    )
    const glasswareFilter = (await getAllGlasswareSlug()).map(
        (glass) => `glassware=${glass.slug}`
    )
    const alcoholFilter = (await getAllAlcoholSlugs()).map(
        (alcohol) => `alcohol=${alcohol.slug}`
    )

    const urls = cocktails
        .concat(goods)
        .concat(tools)
        .concat(glassware)
        .concat(tagsFilter)
        .concat(goodsFilter)
        .concat(toolsFilter)
        .concat(tastsFilter)
        .concat(alcoholVolumeFilter)
        .concat(glasswareFilter)
        .concat(alcoholFilter)

    return urls
})
