import React from 'react';
import './Graph.css'

import {NETSTATES} from '../../Constants'

let getStateString = (state)=>{
  switch(state){
    case NETSTATES.UP: return "up"
    case NETSTATES.PROBLEMS: return "problems"
    case NETSTATES.CRITICAL: return "critical"
  }
}

let setPower = (data) => {
  let lastPower = 0
  data = data.map((state, i)=>{
    let power

    if(i===0){
      switch(state){
        case NETSTATES.UP: power = 0; break
        case NETSTATES.PROBLEMS: power = 1; break
        case NETSTATES.CRITICAL: power = 2; break
      }
    }else{
      switch(state){
        case NETSTATES.UP: power = lastPower-1; break
        case NETSTATES.PROBLEMS: power = lastPower+1; break
        case NETSTATES.CRITICAL: power = lastPower+2; break
      }
    }

    power = power > 2 ? 2:power
    power = power < 0 ? 0:power

    console.log(power, lastPower, state);

    lastPower = power

    return {state: getStateString(state), power}
  })

  console.log(data);

  return data
}

let getOpacity = (i, maxIndex) => {
  let shadePercent = ((i/maxIndex)+0.3)
  shadePercent = shadePercent > 1 ? 1:shadePercent
  shadePercent = shadePercent < 0.5 ? 0.5:shadePercent

  return shadePercent
}

const Graph = ({data, full}) => {

  data = setPower(data)

  return data ? (
    <div className={"graph "+(full ? "full":"")}>
      {data.map((unit, i) => {

        let state = unit.state,
            opacity = getOpacity(i, data.length),
            power = unit.power

        return (
          <div className={"unit state-"+state+" power-"+power} style={{opacity}} key={i}></div>
        )
      })}
    </div>
  ):null
}

export default Graph;
