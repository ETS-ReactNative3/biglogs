import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {Marker} from 'react-mapbox-gl';
import './BusinessMarker.css'

const BusinessMarker = ({name, lat, lng}) => {
  console.log({lat,lng});
  return(
    <Marker coordinates={{lat, lng}} offset={[0, -8]}>
      <Avatar className="businessMarker" style={{background: "white", color: "#333", overflow: "initial"}}>{name !== "" ? name[0].toUpperCase(): ""}</Avatar>
    </Marker>
  )
};

export default BusinessMarker;
