import React, { Component } from 'react';
import Graph from '../Graph/Graph'
import Button from '@material-ui/core/Button';
import ArrowIcon from '@material-ui/icons/ArrowForward';


import './Selected.css';

class Selected extends Component {

  render() {
    // console.log(this.props.business);
    let business = this.props.business || {
      business:"",
      ip:"",
      defaultGateway:""
    }
    return (
      <div className={"selected"+(this.props.business !== null ? " open" : "")}>
        <Button
          color="primary"
          className="closeSelectedButton"
          style={{position: "absolute", borderRadius: 32, width:64, height: 64}}
          onClick={()=>this.props.closeSelected()}
        >
          <ArrowIcon/>
        </Button>
        <h2>{business.name}</h2>
        <p>{business.ip}</p>
        {this.props.business ?
          <div className="graphContainer">
            <Graph data={business.uptime} height={32} showTime={true}/>
          </div>
        : null}
      </div>
    );
  }

}

export default Selected;
