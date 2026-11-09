import { defineEventHandler } from 'h3'
import { pool } from '~/server/utils/postgres'

const domain = useRuntimeConfig().public.domain

async function getAllCocktailsSlug() {
    const { rows } = await pool.query(
        'SELECT slug FROM cocktails ORDER BY position'
    )
    return rows
}

async function getCatalogSlugs(kind) {
    const { rows } = await pool.query(
        'SELECT slug FROM catalog_items WHERE kind = $1 ORDER BY position',
        [kind]
    )
    return rows
}

const getAllToolsSlug = () => getCatalogSlugs('tools')
const getAllGoodsSlug = () => getCatalogSlugs('goods')
const getAllGlasswareSlug = () => getCatalogSlugs('glassware')
const getAllTagsSlug = () => getCatalogSlugs('tags')
const getAllTastesSlug = () => getCatalogSlugs('tastes')
const getAllAlcoholVolumeSlug = () => getCatalogSlugs('alcoholVolume')
const getAllAlcoholSlugs = () => getCatalogSlugs('alcohol')
export default defineEventHandler(async (event) => {
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

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
        .map(
            (url) => `
      <url>
        <loc>${domain}/${url}</loc>
        <lastmod>${url.lastmod || new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
      </url>
    `
        )
        .join('')}
  </urlset>`

    event.node.res.setHeader('Content-Type', 'application/xml')

    return sitemap
})
