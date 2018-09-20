import React from 'react';
import './Sidebar.css'

import {Button} from '../../Globals/Globals'
import Graph from '../../Graph/Graph'

import {NETSTATES} from '../../../Constants'

let businesses = [],
    getRandomNames = ()=>{
      let nameList = ["IT Kauai", "Suite Paradise", "Kilohana Partners", "Unlimited Construction", "The Parrish Collection", "Insurance Factors"]
      return Math.round(Math.random()*(nameList.length-1))
    },
    getRandomGraphData = () => {
      let graph = []

      for(let i=0; i<24); i++){
        let percentage = Math.round(Math.random()*100),
            state
        if(percentage < 70) state = 0
        else if(percentage > 60 && percentage < 85) state = 1
        else state = 2
        graph.push(state)
      }
    }

for(let i=0; i<Math.round(Math.random()*10); i++){
  businesses.push({name: getRandomNames(), graph: getRandomGraphData()})
}

const Sidebar = ({}) => (
  <div className="sidebar">
    <Button/>
    <div className="businessList">
      {businesses.map((business, i)=>{
        <h3>{business.name}</h3>
        <Graph/>
      })}
    </div>
  </div>
);

export default Sidebar;
