import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './header'
import AppRouter from './router'
import Player from './player'
import './index.scss'


class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="fullPage">
          <AppRouter />
          <Player />
      </div>
      
    )
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);