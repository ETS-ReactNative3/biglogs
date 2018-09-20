import React from 'react';
import './Header.css'

import {UserIconButton} from '../../Globals/Globals'

const Header = () => (
  <div className="header">
    <img src="/logo-backless.png" alt="Big Logs Logo" height="48px" className="app-logo"/>

    <UserIconButton style={{float: "right", marginTop: 16, marginRight: 8}} />
  </div>
);

export default Header;
