const express = require("express");
const path = require('path');
const app = require('./functions/setup')

app.db = require('./functions/startDB')()

require('./functions/routes')(app)

// require('./functions/stopDB')(app.db)

require('./functions/pingBusinesses')(app)

app.use(express.static(path.join(__dirname, "client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
