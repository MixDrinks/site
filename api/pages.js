export const getItems = (path) => {
    return $fetch(`https://newapi.mixdrinks.org/api${path}`)
}
export const getCoctails = (path, fetchWIXUP) => {
    return fetchWIXUP(`https://newapi.mixdrinks.org/api/filter/${path}`)
}