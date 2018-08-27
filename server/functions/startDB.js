const sqlite3 = require('sqlite3').verbose()

module.exports = () => {
  let db = new sqlite3.Database('./server/db/businesses.db', (err)=>{
    if(err){
      return console.log(err.message);
    }

    let sql = `CREATE TABLE IF NOT EXISTS businesses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING,
        ip STRING,
        gateway STRING,
        lat FLOAT,
        lng FLOAT
      )`

    db.get(sql, (err, row)=>{
      if(err) return console.log(err.message);
    })
    console.log("connection successful");

  })
  return db
}
