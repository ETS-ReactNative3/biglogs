import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import GPSIcon from '@material-ui/icons/ControlPoint';
// import TextField from '@material-ui/core/TextField';

import './Actions.css'

class Actions extends Component {
  render() {
    let open = this.props.mode === "open"
    // console.log(this.props);
    return (
      <div className={"actionsContainer " + (open ? " open" : "")}>

        <Button
          variant="fab"
          color={open ? "default" : "primary"}
          aria-label="Add"
          style={{position: "fixed", top: 32, left: open ? 256-72 : 32}}
          className={"ActionButton"+(open ? " active" : "")}
          onClick={()=>{
            open ?
            this.props.switchMode("") : this.props.switchMode("open")
          }}
        >
          <AddIcon />
        </Button>

        <div className="businessList">
          <div className="businessListHeader">
            <h2>Businesses</h2>
          </div>
          <div className="buttonContainer">
            <Button
             className="setBusinessButton"
             variant="contained"
             color="primary"
             style={{maxWidth: 256, margin: "0 auto", width: "90%"}}
             onClick={()=>{
               this.props.switchMode("creating")
             }}
            >
             <GPSIcon style={{marginRight: 16}}/>
             Add Business
            </Button>
          </div>
          {this.props.businesses.map((business)=>(
            <div
              key={business.id}
              className={"businessListing " + (this.props.hoveredBusiness === business.id ? "hovered" : "")}
              onMouseEnter={()=>this.props.setHoveredBusiness(business.id)}
              onMouseLeave={()=>this.props.setHoveredBusiness(null)}
            >
              <h4>{business.name}</h4>
              <p>{business.ip}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

}

export default Actions;
