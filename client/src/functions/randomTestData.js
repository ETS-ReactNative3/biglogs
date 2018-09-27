import {NETSTATES} from '../Constants'

const randomTestData = (nameList, minAmount, maxAmount) => {
  let businesses = [],
      getRandomName = ()=>{
        return nameList[Math.round(Math.random()*(nameList.length-1))]
      },
      getRandomGraphData = () => {
        let graph = []

        for(let i=0; i<24; i++){
          let percentage = Math.round(Math.random()*100),
              state
          if(percentage < 90) state = NETSTATES.UP
          else if(percentage > 90 && percentage < 95) state = NETSTATES.PROBLEMS
          else state = NETSTATES.CRITICAL
          graph.push(state)
        }

        return graph
      }

  for(let i=0; i<minAmount+Math.round(Math.random()*(maxAmount-minAmount)); i++){
    let name = getRandomName(),
        graph = getRandomGraphData(),
        state = graph[graph.length-1]

    businesses.push({name, graph, state})
  }

  return businesses
}

export default randomTestData
