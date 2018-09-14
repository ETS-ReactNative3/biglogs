import React, { Component } from 'react';
import './NewBusinessForm.css'
import TextField from "@material-ui/core/TextField"
// import Select from "@material-ui/core/Select"
// import MenuItem from "@material-ui/core/MenuItem"
import Button from '@material-ui/core/Button';

import Netmask from 'netmask'
let Mask = Netmask.Netmask


class NewBusinessForm extends Component {

  state = {
    ipError: false,
    netmask: ""
  }

  render() {
    return (
      <div className={"NewBusinessForm "+(this.props.open ? "open" : "")}>
        <div className="formContainer">
          <h1>Add Business</h1>
          <TextField
            fullWidth
            id="businessName"
            label="Business Name"
            placeholder=""
            onChange={(e)=>this.props.setNewBusinessName(e.target.value)}
            style={{marginBottom: 32}}
          />
          <TextField
            fullWidth
            id="IP"
            label="External IP Address"
            placeholder="eg: 123.456.789"
            onChange={(e)=>this.props.setNewBusinessIP(e.target.value)}
            onBlur={()=>{
              this.checkForDefaultGateway(this.state.ip, this.state.netmask)
            }}
            error={this.state.error}
            style={{width: "70%", marginBottom: 32}}
          />

          <p className="ipSeparator" style={{width: "5%"}}>/</p>
          <TextField
            fullWidth
            id="netmask"
            label="Netmask"
            placeholder="eg: 24"
            onChange={(e)=>this.setState({netmask: e.target.value})}
            onBlur={()=>{
              this.checkForDefaultGateway(this.props.newBusiness.IP, this.state.netmask)
            }}
            style={{width: "25%"}}
          />

          {this.props.newBusiness.gateway ?
            <TextField
              fullWidth
              id="defaultGateway"
              label="Default Gateway"
              placeholder="eg: 123.456.789"
              onChange={(e)=>this.setState({defaultGateway: e.target.value})}
              value={this.props.newBusiness.gateway}
              style={{marginBottom: 32}}
            />
          :null}

          <Button
            color={"primary"}
            variant={"contained"}
            aria-label="Place Business"
            style={{width: "47.5%", marginRight: "5%"}}
            onClick={()=>this.props.switchMode("dropping")}
          >
            Place Business
          </Button>

          <Button
            color={"default"}
            aria-label="Cancel"
            style={{width: "47.5%"}}
            onClick={()=>{
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  checkForDefaultGateway = (ip, mask) => {
    if(ip && mask){
      try{
        let block = new Mask(ip+"/"+mask)
        console.log(block);
        let defaultGateway = block.first
        this.props.setNewBusinessGateway(defaultGateway)
        return true
      }

      catch(e){
        this.setState({ipError: true})
        this.props.setNewBusinessGateway("")
      }
    }

    return false
  }
}

export default NewBusinessForm;
