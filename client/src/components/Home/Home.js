import React, { Component } from 'react';
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

import {Button, ToggleSwitch} from '../Globals/Globals'
import LogList from './LogList/LogList'

class Home extends Component {
  render() {
    return (
      <div className="content-container">
        <Header/>
        <Sidebar/>

        <div className="logs">
          <div className="homeHeader">
            <ToggleSwitch
              selectedColor="#b4d1a7"
              unselectedColor="#fbf7d8"
              iconColor="#8fa887"
              toggle={0}
              leftIcon={<FontAwesomeIcon icon="bars"/>}
              rightIcon={<FontAwesomeIcon icon="th-large"/>}
              style={{float:"left"}}
            />
            <Button style={{background:"#b4d1a7", color: "#8fa887", float: "right"}} icon={<FontAwesomeIcon icon="plus" style={{marginRight:8}}/>} value="New Log"/>
          </div>

          <LogList/>
        </div>
        <div className="map-container">
          {/* <Map/> */}
        </div>
      </div>
    );
  }

}

export default Home;
