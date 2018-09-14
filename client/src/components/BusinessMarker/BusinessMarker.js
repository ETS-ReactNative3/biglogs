import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
import {Marker} from 'react-mapbox-gl';
import './BusinessMarker.css'

const BusinessMarker = ({bID, name, coordinates, onClick, up}) => {
  // console.log({coordinates});
  return(
    <Marker coordinates={coordinates} offset={[0, -8]} onClick={(e)=>onClick(e, bID)}>
      <div className="businessMarker" style={{background: up ? "linear-gradient(#2383c6, #2383c5)" : "#e17055"}}>{name !== "" ? name[0].toUpperCase(): ""}</div>
    </Marker>
  )
};

export default BusinessMarker;
