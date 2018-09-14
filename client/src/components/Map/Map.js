import React, { Component } from 'react';
import ReactMapboxGl, {ZoomControl} from "react-mapbox-gl";
import BusinessMarker from '../BusinessMarker/BusinessMarker'
// import { Cluster } from "react-mapbox-gl";
// import {Marker} from "react-mapbox-gl"
import './Map.css'

const MapCanvas = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  // interactive: false
});


const mapProps = {
  center: [-157.4301116382942, 20.903567738945583],
  zoom: [8],
  // maxBounds: [[-154.53764766568662, 18.59746392984532], [-160.5428861346204, 22.6379629559175]],
  style: "mapbox://styles/itkauai/cjlf2g2da0l2k2rms9yfq3l4c",
};

class Map extends Component {
  state = {
    map: null
  };

  onStyleLoad = (map)=>{
    this.setState({map})
    this.props.finishedLoading()
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
    // let ClusterMarker = coordinates => <Marker coordinates={coordinates} style={{background: "red", color: "white"}}>C</Marker>

    return (
      <MapCanvas {...mapProps} onClick={this.addBusiness} onStyleLoad={this.onStyleLoad}>
        {/* <Cluster ClusterMarkerFactory={ClusterMarker}> */}
          {this.props.businesses.map((data, i)=>{
            // console.log("data", data);
            return(
            <BusinessMarker
              key={i}
              bID={i}
              name={data.name}
              up={data.state}
              coordinates={{lat: data.lat, lng: data.lng}}
              onClick={this.props.setSelectedBusiness}
            />
            // ClusterMarker({lat: data.lat, lng: data.lng})
          )})}
        {/* </Cluster> */}

        <ZoomControl />
      </MapCanvas>
    );
    // return (
    //   <MapCanvas {...mapProps} onClick={this.addBusiness} onStyleLoad={this.onStyleLoad}>
    //     {this.props.businesses.map((data, i)=>(
    //       <BusinessMarker key={i} bID={i} name={data.name} lat={data.lat} lng={data.lng} onClick={this.props.setSelectedBusiness} />
    //     ))}
    //
    //     <ZoomControl />
    //   </MapCanvas>
    // );
  }
}

export default Map;
