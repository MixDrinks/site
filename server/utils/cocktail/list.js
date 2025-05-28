import { db } from '~/server/utils/mongo'

const formats = ['webp', 'jpg']

const buildCocktailInListImage = (slug) => {
    const sizes = [
        { responseSize: '414px', imageSize: '300' },
        { responseSize: '0', imageSize: '100' }
    ]

    return formats.flatMap((format) =>
        sizes.map((size) => ({
            srcset: `/api/image/cocktail/${slug}-${size.imageSize}.${format}`,
            media: `screen and (min-width: ${size.responseSize})`,
            type: `image/${format}`
        }))
    )
}

export async function getCocktailsBySlugs(slugs) {
    const matchStage = {
        $match: {
            slug: { $in: Array.from(slugs) }
        }
    }

    const addFieldsStage = {
        $addFields: {
            ratingScore: {
                $cond: {
                    if: { $gt: [{ $ifNull: ['$ratingCount', 0] }, 0] },
                    then: {
                        $divide: [
                            { $ifNull: ['$ratingValue', 0] },
                            { $ifNull: ['$ratingCount', 1] }
                        ]
                    },
                    else: 0
                }
            }
        }
    }

    const projectStage = {
        $project: {
            _id: 0,
            slug: 1,
            name: 1,
            visitCount: 1,
            ratingScore: 1,
            ratingCount: 1
        }
    }

    const cocktails = await db
        .collection('cocktails')
        .aggregate([matchStage, addFieldsStage, projectStage])
        .toArray()

    cocktails.forEach((cocktail) => {
        cocktail.rating = cocktail.ratingScore
        cocktail.images = buildCocktailInListImage(cocktail.slug)

        delete cocktail.ratingScore
    })
    return cocktails
}
