const DBFunctions = {
  get: (app, sql) => new Promise(function(resolve, reject){
    app.db.get(sql, [], (err, rows)=>{
      if(err) return reject(err)
      else return resolve(rows)
    })
  }),
  all: (app, sql) => new Promise(function(resolve, reject){
    app.db.all(sql, [], (err, rows)=>{
      if(err) return reject(err)
      else return resolve(rows)
    })
  })
}


module.exports = DBFunctions
