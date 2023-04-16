//script
const script = require('./scripts/json_parse')

exports.links = (app) => {
    app.get('/', (req, res) => {
        let data = script.parse([req.headers.width, req.headers.height])
        res.json(data);
    })
}