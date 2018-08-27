module.exports = (db) => {
  db.close((err)=>{
    if(err){
      console.log(err.message);
    }

    console.log('Close the database connection.');
  })
}
