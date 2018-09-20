import React, { Component } from 'react';
import './App.css';

import Home from './components/Home/Home'

// import API from './functions/api'
// import connectSocket from './functions/connectSocket'
// import disconnectSocket from './functions/disconnectSocket'

// import ErrorBanner from './components/ErrorBanner/ErrorBanner'

// import Auth from './components/Auth/Auth'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
