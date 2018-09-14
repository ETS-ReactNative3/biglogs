const request = require('../../functions/DBFunctions')

module.exports = app => {
  app.get('/api/fetch-businesses', (req, res) => {
    let sql = `SELECT * FROM businesses`

    console.log("get");

    request.all(app.businessDB, sql)
    .then((data) => res.send(data))
    .catch(err => res.status(500).send(err.message))
  })
}
