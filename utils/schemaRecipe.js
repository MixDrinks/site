const author = {
    '@type': 'Organization',
    name: 'MixDrinks',
}

export const schemaRecipe = (cocktail, description) => {

    const rating = () => {
        if (cocktail.rating) {
            return {
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: cocktail.rating,
                    ratingCount: cocktail.ratingCount,
                    worstRating: 1,
                    bestRating: 5,
                },
            }
        }
    }

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: cocktail.name,
        author: author,
        description: description,
        image: cocktail.meta.ogImage,
        recipeIngredient: cocktail.goods.map((good) => good.name),
        recipeInstructions: cocktail.receipt,
        keywords: cocktail.tags.map((tag) => tag.name),
        recipeCategory: 'Коктейлі',
        prepTime: 'PT10M',
        cookTime: 'PT10M',
        ...rating,
    })
}