import React from 'react';
import './Graph.css'

import {NETSTATES} from '../../Constants'

const Graph = ({data, full}) => {
  let getStateString = (state)=>{
    switch(state){
      case NETSTATES.UP: return "up"
      case NETSTATES.PROBLEMS: return "problems"
      case NETSTATES.CRITICAL: return "critical"
    }
  }

  return data ? (
    <div className={"graph "+(full ? "full":"")}>
      {data.map((state, i) => (
        <div className={"unit state-"+getStateString(state)} key={i}></div>
      ))}
    </div>
  ):null
}

export default Graph;
