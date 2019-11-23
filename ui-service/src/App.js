import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom"
import history from './history'
import './App.css';

import LoginPage from './Pages/LoginPage/LoginPage';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch id="container">
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;