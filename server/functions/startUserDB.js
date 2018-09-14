const sqlite3 = require('sqlite3').verbose()

module.exports = () => {
  let db = new sqlite3.Database('./server/db/users.db', (err)=>{
    if(err){
      return console.log(err.message);
    }

    let sql = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role NUMBER
      )`

    db.get(sql, (err, row)=>{
      if(err) return console.log(err.message);
    })
    console.log("connection successful");

  })
  return db
}
