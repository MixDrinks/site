export const updateRating = (slug, value) => {
    $fetch(`https://newapi.mixdrinks.org/api/cocktail/${slug}/score`, {
        method: 'POST',
        body: {
            value: value
        }
    })
}
export const updateVisit = (slug) => {
    $fetch(`https://newapi.mixdrinks.org/api/cocktail/${slug}/visit`, {
        method: 'POST'
    })
}
