import React from 'react';
import './LogList.css'
import Graph from '../../Graph/Graph'
import randomTestData from '../../../functions/randomTestData'
import {RandomTestIcon} from '../../Globals/Globals'
import {NETSTATES} from '../../../Constants'

let logNames = ["Default Gateway", "Switch", "Router", "Seans Computer", "Logans Computer", "Steve's Computer", "Printer"]
let logs = randomTestData(logNames, 1, 10)

let convertStateToClass = (state) => {
  switch(state){
    case NETSTATES.UP: return "up"
    case NETSTATES.PROBLEMS: return "problems"
    case NETSTATES.CRITICAL: return "critical"
  }
}

const LogList = () => (
  <div className="logContainer">
    {logs.map((log, i)=>(
      <div className={"log log-"+(convertStateToClass(log.state))} key={i}>
        <div className="icon">
          <RandomTestIcon imageStyle={{width: 32, height: 32}}/>
        </div>
        <div className="name">
          <h3>{log.name}</h3>
        </div>
        <div className="graphContainer">
          <Graph data={log.graph} full/>
        </div>
      </div>
    ))}
  </div>
);

export default LogList;
