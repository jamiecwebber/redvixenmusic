import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './header'
import AppRouter from './router'
import Player from './player'
import './index.css'


class App extends Component {
  constructor() {
    super();
    this.getUsers();
  }
  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/sounds`)
    .then((res) => { console.log(res); })
    .catch((err) => { console.log(err); });
  }
  render() {
    return (
      <div className="fullPage">
        <div className="bodyContainer">

          <AppRouter />
          <Player />
          
        </div>
      </div>
    )
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);