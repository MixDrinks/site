export const querySTR = (route, withoutPage) => {
    let queryArr = Object.keys(route.query).map((value) => {
        return {
            name: value,
            value: route.query[value]
        }
    })
    if (withoutPage) {
        queryArr = queryArr.filter((query) => query.name !== 'page')
    }
    if (!queryArr.length) {
        return ''
    }
    if (queryArr.length === 1) {
        return `?${queryArr[0].name}=${queryArr[0].value}`
    }
    return queryArr.reduce((str, queryItem, index) => {
        return str + `${index ? '&' : ''}${queryItem.name}=${queryItem.value}`
    }, '?')
}
