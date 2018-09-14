const request = require('../../functions/DBFunctions')

module.exports = app => {
  app.post('/api/login', (req, res) => {
    //check for user in DB, check that password matches
    console.log("login");
    let sql = `SELECT * FROM users WHERE username="${req.body.username}"`
    request.get(app.userDB, sql)
    .then((user)=>{
      console.log(user);
      let compare = app.bcrypt.compareSync(req.body.password, user.password)
      console.log(compare, user.password, req.body.password);
      if(compare){
        let token = app.jwt.sign({ id: user.id, password: user.password }, app.JWTSECRET, {
          expiresIn: 86400 // expires in 24 hours
        })
        res.send({msg: "success", token})
      }else{
        //send that password is wrong
        res.send({msg: "Password incorrect"})
      }
    })
    .catch((err)=>{
      console.log("err", err);
      //send that user does not exist
      res.send({msg: "User does not exist"})
    })
  })
}
