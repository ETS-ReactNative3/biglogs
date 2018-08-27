import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import GPSIcon from '@material-ui/icons/ControlPoint';
import TextField from '@material-ui/core/TextField';

import './Actions.css'

class Actions extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="actionsContainer">
        <Button variant="fab" color="primary" aria-label="Add" className={"ActionButton"+(this.props.mode === "adding" ? " active" : "")} onClick={()=>this.props.switchMode("adding")}>
          <AddIcon />
        </Button>

        <div className={"addBusinessForm"+(this.props.mode === "adding" ? " open" : "")}>
          <div className="formContainer">
            <TextField
              id="name"
              label="Name"
              value={this.props.newBusiness.name}
              onChange={(e)=>this.props.setNewBusinessName(e.target.value)}
              margin="normal"
              fullWidth
            />

            <TextField
              id="IP"
              label="IP"
              value={this.props.newBusiness.IP}
              onChange={(e)=>this.props.setNewBusinessIP(e.target.value)}
              margin="normal"
              fullWidth
            />

            <TextField
              id="defaultGateway"
              label="Default Gateway"
              value={this.props.newBusiness.gateway}
              onChange={(e)=>this.props.setNewBusinessGateway(e.target.value)}
              margin="normal"
              fullWidth
            />

            <Button
              className="setBusinessButton"
              variant="contained"
              color="primary"
              style={{maxWidth: 256, margin: "0 auto", width: "100%", marginTop: 32}}
              onClick={()=>this.props.switchMode("dropping")}
            >
              <GPSIcon style={{marginRight: 16}}/>
              Add Business
            </Button>
          </div>
        </div>
      </div>
    );
  }

}

export default Actions;
