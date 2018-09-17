import {NETSTATES} from '../Constants'

const processBusinessUptimeData = (newData, businesses) => {
  console.log("starting");
  // console.log(newData, businesses);

  if(!businesses) businesses = []

  //for each business
  newData.forEach((b, i)=>{
    //split comma separated strings
    let timestampStatesCombined = b.uptime
    timestampStatesCombined = timestampStatesCombined.split(', ')

    //then split those strings into date and state and place them in an array
    let uptime = []
    timestampStatesCombined.forEach((value, i) => {
      let split = value.split('|')
      uptime.push({
        time: new Date(split[0]),
        iState: split[1] === "true",
        gState: split[2] === "true"
      })
    })

    let graph = createGraphOfLast4Hours(uptime)
    // console.log(uptime, graph);

    b.uptime = graph
    // return b;
    let index = businesses.findIndex((business)=>(business.name === b.name))

    // console.log(index);

    if(index > -1) businesses[index] = b
    else businesses.push(b)
  })

  // console.log(businesses);

  return businesses
}

export default processBusinessUptimeData


//----------functions---------------------//

function createGraphOfLast4Hours(uptime){
  let organizedDates = [],
      power = 0,
      lastState = NETSTATES.NODATA,
      currentTime = new Date(),
      mins = currentTime.getMinutes()

  mins = ((10-mins) % 10)+mins-10;
  currentTime.setMinutes(mins)

  for(let i = 24; i > 0; i--){
    let maxTime, minTime
    maxTime = new Date(currentTime.getTime())
    minTime = new Date(currentTime.getTime())

    maxTime.setMinutes(maxTime.getMinutes()-10*(i-1))
    minTime.setMinutes(minTime.getMinutes()-10*i)

    //if an entry is less than the current time, but more than the next time,
    //put it in the array and set the time to the minimum rounded time
    // console.log(uptime);
    console.log(minTime.getHours()+":"+minTime.getMinutes());
    let entriesInRange = uptime.filter(entry => {
      // console.log(entry.time.getMinutes(), maxTime.getMinutes(), minTime.getMinutes(), entry.time < maxTime && entry.time > minTime);
      return(entry.time < maxTime && entry.time > minTime)
    })


    if(entriesInRange.length){
      let ipEntries = entriesInRange.filter(entry => entry.iState === true) === entriesInRange.length
      let gatewayEntries = entriesInRange.filter(entry => entry.gState === true) === entriesInRange.length

      if(ipEntries && gatewayEntries) lastState = NETSTATES.UP
      else if(!gatewayEntries) lastState = NETSTATES.GATEWAYDOWN
      else if(!ipEntries && gatewayEntries) lastState = NETSTATES.IPDOWN
    }else lastState = NETSTATES.NODATA

    switch(lastState){
      case NETSTATES.UP:
        power++
      break;

      case NETSTATES.IPDOWN:
        power--
      break;

      case NETSTATES.GATEWAYDOWN:
        power-=2
      break;

      case NETSTATES.NODATA:
        power = 0
      break;
    }

    //clamp power within a range
    power = power > 3 ? 3 : power
    power = power < 0 ? 0 : power

    organizedDates.push({time: minTime, power, state: lastState})
  }

  return organizedDates
}
