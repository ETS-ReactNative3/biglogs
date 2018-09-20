import React from 'react';
import './Home.css'

import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

import {Button, ToggleSwitch} from '../Globals/Globals'
import LogList from './LogList/LogList'

const Home = ({}) => (
  <div className="content-container">
    <Header/>
    <Sidebar/>

    <div className="logs">
      <ToggleSwitch/>
      <Button/>
      <LogList/>
    </div>
    <div className="map-container">
      {/* <Map/> */}
    </div>
  </div>
);

export default Home;
