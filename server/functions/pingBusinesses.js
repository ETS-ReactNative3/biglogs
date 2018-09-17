const request = require('./DBFunctions')
const ping = require('ping')

module.exports = (app) => {
  setInterval(()=>{
    console.log("ping")

    let sql = `SELECT * FROM businesses`

    request.all(app.businessDB, sql)
    .then((businesses) => {
      // console.log(businesses)

      let ips = [], gateways = [], pings = []

      businesses.forEach((business)=>{
        ips.push(ping.promise.probe(business.ip))

        let gatewayPing = business.gateway ? ping.promise.probe(business.gateway) : null
        gateways.push(gatewayPing)
      })

      let iPromise = Promise.all(ips)
      .then((values) => {
        values.forEach((value, i)=>{
          console.log(value.alive);
          pings.push({ip: value.alive})
        })

        return Promise.all(gateways)
      })
      .then(values => {
        // console.log(values);
        values.forEach((value, i)=>{
          pings[i].gateway = value.alive
        })

        return Promise.resolve()
      })
      .then(()=>{
        console.log("final", pings)
        let updates = []

        businesses.forEach((b, i)=>{
          if(businesses[i].iState !== pings[i].ip || business[i].gState !== pings[i].gateway){
            let timeStamp = new Date().toISOString() + "|" + pings[i].ip + "|" + pings[i].gateway
            let uptimeString = businesses[i].uptime

            if(uptimeString.length >= 600){
              let uptimeArr = uptimeString.split(', ')
              uptimeArr.shift()

              uptimeString = ""
              uptimeArr.forEach((value)=>{
                if(uptimeString === "") uptimeString = value
                else uptimeString = uptimeString+', '+value
              })
            }

            uptimeString = (uptimeString !== "") ? uptimeString+', '+timeStamp : timeStamp

            let sql = `UPDATE businesses
            SET iState = "${pings[i].ip}",
                gState = "${pings[i].gateway}",
                uptime = "${uptimeString}"
            WHERE name = "${businesses[i].name}"`

            let sql2 = `SELECT * FROM businesses WHERE name = "${businesses[i].name}"`

            //figure out how to return the document being updated and store it in an array
            //for batch proccessing
            updates.push(request.get(app.businessDB, sql).then(()=>request.get(app.businessDB, sql2)))
          }
        })

        return Promise.all(updates)
      })
      .then((updates)=>{
        // console.log(updates, updates.length);
        //send the array of updated businesses to all connected clients
        if(updates.length > 0) app.io.updateBusinesses(updates)
      })


      // Promise.all(iPromise, gPromise)
      // .then(values => {
      //   console.log(values);
      // })
      // .then(values => {
      //   // console.log(values)
      //   let updates = []
      //   values.forEach((value, i)=>{
      //     let newValue
      //     if(value.alive)
      //
      //     if(businesses[i].state !== value.alive.toString()){
      //       //setup promise state for updating this record,
      //       //add promise to array for batch call
      //
      //       let timeStamp = new Date().toISOString() + "|" + value.alive.toString()
      //
      //       let uptimeString = businesses[i].uptime
      //       // console.log(uptimeString.length);
      //       if(uptimeString.length >= 600){
      //         let uptimeArr = uptimeString.split(', ')
      //         uptimeArr.shift()
      //         uptimeString = ""
      //         uptimeArr.forEach((value)=>{
      //           uptimeString = (uptimeString !== "") ? uptimeString+', '+value : value
      //         })
      //       }
      //       // console.log(uptimeString);
      //
      //       uptimeString = (uptimeString !== "") ? uptimeString+', '+timeStamp : timeStamp
      //
      //       let sql = `UPDATE businesses
      //       SET state = "${value.alive.toString()}",
      //           uptime = "${uptimeString}"
      //       WHERE name = "${businesses[i].name}"`
      //
      //       let sql2 = `SELECT * FROM businesses WHERE name = "${businesses[i].name}"`
      //
      //       //figure out how to return the document being updated and store it in an array
      //       //for batch proccessing
      //       updates.push(request.get(app.businessDB, sql).then(()=>request.get(app.businessDB, sql2)))
      //     }
      //   })
      //
      //   return Promise.all(updates)
      // })
      // .then((updates)=>{
      //   // console.log(updates, updates.length);
      //   //send the array of updated businesses to all connected clients
      //   if(updates.length > 0) app.io.updateBusinesses(updates)
      // })
    })
  }, 30000/*300000*/)
}
