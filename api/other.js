export const updateRating = (slug, value) => {
    $fetch(`/api/cocktail/${slug}/score`, {
        method: 'POST',
        body: {
            value: value
        }
    })
}

export const updateVisit = (slug) => {
    $fetch(`/api/cocktail/${slug}/visit`, {
        method: 'POST'
    })
}

export const getListSearch = () => $fetch('/api/cocktails/all')
