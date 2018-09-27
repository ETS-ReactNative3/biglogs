import React from 'react';
import './Sidebar.css'

import {Button, StateIcon} from '../../Globals/Globals'
import Graph from '../../Graph/Graph'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import randomTestData from '../../../functions/randomTestData'

let businessNames = ["IT Kauai", "Suite Paradise", "Kilohana Partners", "Unlimited Construction", "The Parrish Collection", "Insurance Factors"]
let businesses = randomTestData(businessNames, 1, 10)

const Sidebar = () => (
  <div className="sidebar">
    <div className="buttonContainer">
      <Button style={{background:"#d08b5a", color: "white"}} icon={<FontAwesomeIcon icon="plus" style={{marginRight:8}}/>} value="New Business"/>
    </div>
    <div className="businessList">
      {businesses.map((business, i)=>(
        <div className="businessListing" key={i}>
          <div className="left">
            <StateIcon state={business.state}/>
          </div>
          <div className="right">
            <h3>{business.name}</h3>
            <Graph data={business.graph}/>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Sidebar;
