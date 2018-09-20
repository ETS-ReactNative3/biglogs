import React from 'react';
import './Graph.css'

const Graph = ({data}) => {
  return data ? (
    <div className="graph">
      {data.map((state, i) => (
        <div className={"unit state-"+(state)}></div>
      ))}
    </div>
  ):null
}

export default Graph;
