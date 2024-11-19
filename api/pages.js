export const getItems = (path) => {
    return $fetch(`https://newapi.mixdrinks.org/api${path}`)
}
export const getGood = (path) => {
    return $fetch(`/api${path}`)
}
export const getCoctails = (path, fetchWIXUP) => {
    return fetchWIXUP(`https://newapi.mixdrinks.org/api/filter${path}`)
}
export const getFilters = () => {
    return $fetch('https://newapi.mixdrinks.org/api/filters')
}
export const getPosts = (path) => {
    return $fetch(`/api/blog/post-list${path}`)
}
export const getPostsByTag = (path) => {
    return $fetch(`/api/blog/tag${path}`)
}
export const getPost = (path) => {
    return $fetch(`/api/blog/post-details${path}`)
}
export const getCocktail = (path, fetchWIXUP) => {
    return fetchWIXUP(`/api/cocktail${path}`)
}
