const request = require('../../functions/DBFunctions')

module.exports = app => {
  app.post('/api/signup', (req, res) => {
    console.log("signup");
    //insert user in DB if user does not already exist
    let insert = `INSERT INTO users (username, password, role)
    VALUES (
      "${req.body.username}",
      "${app.bcrypt.hashSync(req.body.password, 8)}",
      1
    )`

    let select = `SELECT * FROM users WHERE username="${req.body.username}"`

    request.get(app.userDB, insert)
    .then(()=>request.get(app.userDB, select))
    .then((user)=>{
      let token = app.jwt.sign({ id: user.id, password: user.password }, app.JWTSECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.send({msg: "user created", token})
    })
    .catch((err)=>{
      console.log(err);
      if(err.code === 'SQLITE_CONSTRAINT'){
        res.send({msg: "username is taken"})
      }else{
        res.status(500).send(err)
      }
    })
  })
}
