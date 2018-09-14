const express = require("express");
const app = express();

//Set how request body's are parsed.
app.bodyParser = require('body-parser');
app.use(app.bodyParser.json());
app.use(app.bodyParser.urlencoded({
  extended: true
}));

app.set("port", process.env.PORT || 3001);

// app.io = require('socket.io')()
// require('./setupSocketConnections')(app, 8000)

//Set defaults for error handling.
process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});

module.exports =  app;
