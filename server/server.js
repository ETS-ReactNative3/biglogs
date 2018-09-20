const express = require("express");
const path = require('path');
const app = require('./functions/setup')
require('dotenv').load();

//configure authentication tools
app.jwt = require('jsonwebtoken')
app.bcrypt = require('bcryptjs')
app.JWTSECRET = process.env.JWTSECRET

//setup Socket.
app.io = require('./functions/socket-controller')
app.io.connect()

//setup databases
app.userDB = require('./functions/startUserDB')()
app.businessDB = require('./functions/startBusinessDB')()

//setup routes
require('./routing')(app)

// require('./functions/stopDB')(app.businessDB)

//begin pinging businesses
// require('./functions/pingBusinesses')(app)

//serve react client
app.use(express.static(path.join(__dirname, "client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
