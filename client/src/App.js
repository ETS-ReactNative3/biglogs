import React, { Component } from 'react';
import './App.css';

import API from './functions/api'
import connectSocket from './functions/connectSocket'
import disconnectSocket from './functions/disconnectSocket'

import ErrorBanner from './components/ErrorBanner/ErrorBanner'

import Auth from './components/Auth/Auth'
import Map from './components/Map/Map'
import NewBusinessForm from "./components/NewBusinessForm/NewBusinessForm"
import Actions from './components/Actions/Actions'
import Selected from './components/Selected/Selected'

import FullPageLoading from './components/FullPageLoading/FullPageLoading'

import processBusinessUptimeData from './functions/processBusinessUptimeData'

class App extends Component {
  state = {
    auth: null,
    mode: "default",
    socket: null,
    businesses: [],
    newBusiness: {
      name: "",
      IP: "",
      gateway: "",
      coords: {}
    },
    selectedBusiness: null,
    hoveredBusiness: null,
    loading: true,
    authLoading: false,
    error: null
  }

  createNewBusiness = () => {
    console.log(this.state.newBusiness);
    this.setState({...this.state, loading: true})
    API.post('/api/new-business', this.state.newBusiness)
    .then((data)=>{
      console.log("still doing task");
      this.setState({...this.state, businesses: data})
      window.setTimeout(()=>{
        this.setState({...this.state, loading: false})
      }, 1000)
    })
    .catch(err => {
      console.log(err);
      this.setState({...this.state, error: err, loading: false})
    })
  }

  fetchBusinesses = () => {
    this.setState({...this.state, loading: true})
    API.get('/api/fetch-businesses')
    .then((data)=>{
      // console.log("still doing task");
      console.log(data);
      data = processBusinessUptimeData(data, this.state.businesses)

      this.setState({...this.state, businesses: data})
      window.setTimeout(()=>{
        this.setState({...this.state, loading: false})
      }, 3000)
    })
    .catch(err => {
      console.log(err);
      this.setState({...this.state, error: err, loading: false})
    })
  }

  setNewBusinessName = (newVal) => {
    this.setState({newBusiness: {...this.state.newBusiness, name: newVal}})
  }

  setNewBusinessIP = (newVal) => {
    this.setState({newBusiness: {...this.state.newBusiness, IP: newVal}})
  }

  setNewBusinessGateway = (newVal) => {
    this.setState({newBusiness: {...this.state.newBusiness, gateway: newVal}})
  }

  setNewBusinessCoords = (newVal) => {
    this.setState({newBusiness: {...this.state.newBusiness, coords: newVal}})
  }

  switchMode = (mode) => {
    if(mode==="creating")
      this.setState({mode, selectedBusiness: null})
    else {
      this.setState({mode})
    }
  }

  setHoveredBusiness = (bID) => {
    this.setState({...this.state, hoveredBusiness: bID})
  }

  setSelectedBusiness = (e, bID) => {
    let b = this.state.businesses[bID]
    console.log(b);
    this.setState({...this.state, selectedBusiness: b})
  }

  closeSelected = () => {
    this.setState({...this.state, selectedBusiness: null})
  }

  componentWillMount(){
    this.fetchBusinesses()
    let newSocket = connectSocket()
    this.setState({...this.state, socket: newSocket})
    newSocket.on('BUSINESS_UPDATE', (data)=>{
      data = processBusinessUptimeData(data, this.state.businesses)
      this.setState({...this.state, businesses: data})
    })
  }

  componentWillUnmount(){
    disconnectSocket(this.state.socket)
  }

  login = (data) => {
    this.setState({...this.state, authLoading: true})
    API.post('/api/login', data)
    .then((returned)=>{
      this.setState({...this.state, auth: returned.token, authLoading: false})
    })
    .catch((err)=>{
      this.setState({...this.state, error: err, authLoading: false})
    })
  }

  signup = (data) => {
    this.setState({...this.state, authLoading: true})
    API.post('/api/signup', data)
    .then((returned)=>{
      this.setState({...this.state, auth: returned.token, authLoading: false})
    })
    .catch((err)=>{
      this.setState({...this.state, error: err, authLoading: false})
    })
  }

  setError = (e) =>{
    console.log(e);
    this.setState({...this.state, error: e})
  }

  render() {
    return (
      <div className="App">
        <FullPageLoading active={this.state.loading} />
        <ErrorBanner err={this.state.error} setError={this.setError}/>
        <Auth
          authLoading={this.state.authLoading}
          login={this.login}
          signup={this.signup}
        />
        <Map
          businesses = {this.state.businesses}
          setNewBusinessCoords={this.setNewBusinessCoords}
          createNewBusiness={this.createNewBusiness}
          setSelectedBusiness={this.setSelectedBusiness}

          mode={this.state.mode}
          switchMode={this.switchMode}
          finishedLoading={()=>this.setState({loading: false})}
        />

        <NewBusinessForm
          open={this.state.mode === "creating"}
          setError={this.setError}
          switchMode={this.switchMode}
          setNewBusinessName={this.setNewBusinessName}
          setNewBusinessIP={this.setNewBusinessIP}
          setNewBusinessGateway={this.setNewBusinessGateway}
          newBusiness={this.state.newBusiness}
        />

        <Actions
          newBusiness = {this.state.newBusiness}
          businesses = {this.state.businesses}
          setHoveredBusiness = {this.setHoveredBusiness}
          hoveredBusiness = {this.state.hoveredBusiness}

          switchMode={this.switchMode}
          mode={this.state.mode}
        />

        <Selected
          business={this.state.selectedBusiness}
          closeSelected={this.closeSelected}
        />
      </div>
    );
  }
}

export default App;
