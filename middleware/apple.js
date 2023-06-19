const appleJson = require('../static/apple-app-site-association.json')

const handler = (req, res, next) => {
    res.setHeader('Content-type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(appleJson))
}

export default handler