export const query = (route, isNext) => {
    const queryArr = Object.keys(route.query).map((value) => {
        if (isNext && value === 'page') {
            return {
                name: value,
                value: Number(route.query[value]) + 1
            }
        }
        return {
            name: value,
            value: route.query[value]
        }
    })
    if (!queryArr.length) {
        if (isNext) {
            return `?page=1`
        }
        return ''
    }
    if (queryArr.length === 1) {
        if (isNext && queryArr[0].name !== 'page') {
            ;`?${queryArr[0].name}=${queryArr[0].value}&page=1`
        }
        return `?${queryArr[0].name}=${queryArr[0].value}`
    }
    return queryArr.reduce((str, queryItem, index) => {
        return str + `${index ? '&' : ''}${queryItem.name}=${queryItem.value}`
    }, '?')
}
