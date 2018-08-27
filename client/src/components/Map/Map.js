import React, { Component } from 'react';
import ReactMapboxGl, {ZoomControl} from "react-mapbox-gl";
import BusinessMarker from '../BusinessMarker/BusinessMarker'

import './Map.css'

const MapCanvas = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  // interactive: false
});


const mapProps = {
  center: [-157.4301116382942, 20.903567738945583],
  zoom: [8],
  // maxBounds: [[-154.53764766568662, 18.59746392984532], [-160.5428861346204, 22.6379629559175]],
  style: "mapbox://styles/mapbox/streets-v8",
};

class Map extends Component {
  state = {
    map: null
  };

  onStyleLoad = (map)=>{
    this.setState({map})
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.mode === "dropping"){
      this.state.map.getCanvas().style.cursor = 'crosshair';
    }else if(this.props.mode === "dropping"){
      this.state.map.getCanvas().style.cursor = "inherit";
    }
  }

  addBusiness = (MapCanvas, e) => {
    if(this.props.mode === "dropping"){
      this.props.switchMode("default")
      this.state.map.getCanvas().style.cursor = "inherit";
      this.props.setNewBusinessCoords(e.lngLat)
      this.props.createNewBusiness()
    }
  }

  render() {
    return (
      <MapCanvas {...mapProps} onClick={this.addBusiness} onStyleLoad={this.onStyleLoad}>
        {this.props.businesses.map((data, i)=>(
          <BusinessMarker key={i} name={data.name} lat={data.lat} lng={data.lng} />
        ))}

        <ZoomControl />
      </MapCanvas>
    );
  }
}

export default Map;
