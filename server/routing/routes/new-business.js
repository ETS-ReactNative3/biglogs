const request = require('../../functions/DBFunctions')

module.exports = app => {
  app.post('/api/new-business', (req, res) => {
    let sql = `INSERT INTO businesses (name, ip, gateway, lat, lng, iState, gState, uptime)
    VALUES (
      "${req.body.name}",
      "${req.body.IP}",
      "${req.body.gateway}",
      ${req.body.coords.lat},
      ${req.body.coords.lng},
      ${false},
      ${false},
      ""
    )`

    let sql2 = `SELECT * FROM businesses`

    console.log("helloooo");

    request.get(app.businessDB, sql)
    .then((data) => request.all(app.businessDB, sql2))
    .then((data)=> {
      require('../../functions/pingBusinesses')(app)
      return res.send(data)
    })
    .catch(err => res.status(500).send(err.message))
  })
}
