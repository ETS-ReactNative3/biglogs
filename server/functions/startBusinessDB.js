const sqlite3 = require('sqlite3').verbose()

module.exports = () => {
  let db = new sqlite3.Database('./server/db/businesses.db', (err)=>{
    if(err){
      return console.log(err.message);
    }

    let sql = `CREATE TABLE IF NOT EXISTS businesses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        ip TEXT,
        gateway TEXT,
        lat REAL,
        lng REAL,
        state TEXT,
        uptime TEXT
      )`

    db.get(sql, (err, row)=>{
      if(err) return console.log(err.message);
    })
    console.log("connection successful");

  })
  return db
}
