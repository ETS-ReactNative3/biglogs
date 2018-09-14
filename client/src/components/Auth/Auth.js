import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './Auth.css'

class Auth extends Component {
  state = {
    loginSignup: "login",
    username: "",
    password: ""
  }

  render() {
    return (
      <div className={"auth "+(this.props.auth === null ? "" : "closed")}>
        <div className="innerContainer">
          <h1>JANUS</h1>
          <input value={this.state.username} placeholder="username" onChange={(e)=>this.setState({username: e.target.value})}/>
          <input value={this.state.password} placeholder="password" onChange={(e)=>this.setState({password: e.target.value})}/>
          <Button
            style={{width:"45%", margin:"0, 2.5%"}}
            onClick={()=>{this.props.login({username: this.state.username, password: this.state.password})}}
          >
            Login
          </Button>

          <Button
            style={{width:"45%", margin:"0, 2.5%"}}
            onClick={()=>{this.props.signup({username: this.state.username, password: this.state.password})}}
          >
            Signup
          </Button>
        </div>
      </div>
    );
  }

}

export default Auth;
