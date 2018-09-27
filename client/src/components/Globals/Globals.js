import React from 'react';
import './Globals.css'

import {NETSTATES} from '../../Constants'


export const Button = ({style, value, type, icon}) => (
  <button className={"button "+(type)} style={{...style}}>
    {icon} {value}
  </button>
);

export const ToggleSwitch = ({style, toggle, leftIcon, rightIcon, selectedColor, unselectedColor, iconColor}) => (
  <div className="toggleSwitch" style={{...style}}>
    <button className="left" style={{background: toggle ? unselectedColor: selectedColor, color: iconColor}}>
      {leftIcon}
    </button>
    <button className="right" style={{background: toggle ? selectedColor: unselectedColor, color: iconColor}}>
      {rightIcon}
    </button>
  </div>
);

export const UserIconButton = ({style}) => (
  <div className="userIconButton" style={{...style}}></div>
);

export const StateIcon = ({state, style}) => (
  <img
    className="stateIcon"
    style={{...style}}
    src={(()=>{
      switch(state){
        case NETSTATES.UP: return '/up-icon.png'
        case NETSTATES.PROBLEMS: return '/problems-icon.png'
        case NETSTATES.CRITICAL: return '/down-icon.png'
      }
    })()}
    alt={(()=>{
      switch(state){
        case NETSTATES.UP: return 'This business is up'
        case NETSTATES.PROBLEMS: return 'This business has some network problems'
        case NETSTATES.CRITICAL: return 'This business has some critical issues'
      }
    })()}
  />
);

export const RandomTestIcon = ({style}) => (
  <img
    className="stateIcon"
    style={{...style}}
    src={(()=>{
      let paths = ['/favicons/android-chrome-192x192.png']
      return paths[Math.round(Math.random()*(paths.length-1))]
    })()}
    alt="This is just a test"
  />
);
