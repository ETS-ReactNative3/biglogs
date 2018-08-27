import React, { Component } from 'react';
import './App.css';

import API from './functions/api'

import ErrorBanner from './components/ErrorBanner/ErrorBanner'

import Map from './components/Map/Map'
import Actions from './components/Actions/Actions'

import FullPageLoading from './components/FullPageLoading/FullPageLoading'

class App extends Component {
  state={
    mode: "default",
    businesses: [],
    newBusiness: {
      name: "",
      IP: "",
      gateway: "",
      coords: {}
    },
    loading: false,
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
      console.log("still doing task");
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
    this.setState({mode})
  }

  componentWillMount(){
    this.fetchBusinesses()
  }

  render() {
    return (
      <div className="App">
        <FullPageLoading active={this.state.loading} />
        <ErrorBanner err={this.state.error}/>
        <Map
          businesses = {this.state.businesses}
          setNewBusinessCoords={this.setNewBusinessCoords}
          createNewBusiness={this.createNewBusiness}

          mode={this.state.mode}
          switchMode={(mode)=>this.setState({mode: mode})}
        />

        <Actions
          newBusiness = {this.state.newBusiness}
          setNewBusinessName={this.setNewBusinessName}
          setNewBusinessIP={this.setNewBusinessIP}
          setNewBusinessGateway={this.setNewBusinessGateway}

          switchMode={this.switchMode}
          mode={this.state.mode}
        />
      </div>
    );
  }
}

export default App;
