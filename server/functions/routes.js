const request = require('./DBFunctions')
module.exports = (app, db) => {
  app.post('/api/new-business', (req, res) => {

    let sql = `INSERT INTO businesses (name, ip, gateway, lat, lng)
    VALUES ("${req.body.name}", "${req.body.IP}", "${req.body.gateway}", ${req.body.coords.lat}, ${req.body.coords.lng})`

    let sql2 = `SELECT * FROM businesses`

    request.get(app, sql)
    .then((data) => request.all(app, sql2))
    .then((data)=> res.send(data))
    .catch(err => res.status(500).send(err.message))
  })

  app.get('/api/fetch-businesses', (req, res) => {
    let sql = `SELECT * FROM businesses`

    request.all(app, sql)
    .then((data) => res.send(data))
    .catch(err => res.status(500).send(err.message))
  })
}
