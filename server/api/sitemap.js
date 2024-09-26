import { defineEventHandler } from 'h3'
import { db } from '../utils/mongo'

async function getAllCocktailsSlug() {
    return db
        .collection('cocktails')
        .find()
        .project({ slug: 1, _id: 0 })
        .toArray()
}

async function getAllToolsSlug() {
    return db.collection('tools').find().project({ slug: 1, _id: 0 }).toArray()
}

async function getAllGoodsSlug() {
    return db.collection('goods').find().project({ slug: 1, _id: 0 }).toArray()
}

async function getAllGlasswareSlug() {
    return db
        .collection('glassware')
        .find()
        .project({ slug: 1, _id: 0 })
        .toArray()
}

async function getAllTagsSlug() {
    return db.collection('tags').find().project({ slug: 1, _id: 0 }).toArray()
}

async function getAllTastesSlug() {
    return db.collection('tastes').find().project({ slug: 1, _id: 0 }).toArray()
}

async function getAllAlcoholVolumeSlug() {
    return db
        .collection('alcoholVolume')
        .find()
        .project({ slug: 1, _id: 0 })
        .toArray()
}

async function getAllAlcoholSlugs() {
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
