import React from 'react';
import './Graph.css'

const Graph = ({data, height, width, showTime}) => {

  let blocks = [], times = []
  // console.log(data);
  if(!data) data = []
  data.forEach((unit, i)=>{
    // let power = (i>0) ? data[i-1].power : 2
    //
    // power += unit.state ? 1 : -1
    //
    // if(power > 3) power = 3
    // if(power < 0) power = 0
    //
    let power = data[i].power

    let color = unit.state,
        hours = unit.time.getHours().toString(),
        minutes = unit.time.getMinutes().toString()

    let time = hours+":"+(minutes === "0" ? "00" : minutes)

    blocks.push(<div key={i} className={"unit "+(color)+" power"+unit.power}></div>)
    times.push(<span className="graphTime" key={i}><p>{time}</p></span>)
  })

  return (
    <div className="graph" style={{height}}>
      <div className="units">
        {blocks}
      </div>
      {showTime ? <div className="times">{times}</div> : null}
    </div>
  )
};

export default Graph;
