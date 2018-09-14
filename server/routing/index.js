module.exports = (app) => {
  //user routes
  require('./routes/login')(app)
  require('./routes/signup')(app)

  //business routes
  require('./routes/new-business')(app)
  require('./routes/get-businesses')(app)
}
