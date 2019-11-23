import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import './App.css';

import LoginPage from './Pages/LoginPage/LoginPage';
import MainPage from './Pages/MainPage/MainPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
    };
  }

  setUser = (user) => {
    this.setState({
      user: user,
    });
  }

  render() {
    return (
      <Router history={history}>
        <Switch id='container'>
          <Route exact path='/'>
            <LoginPage setUser={this.setUser}/>
          </Route>
          <Route exact path='/main'>
            <MainPage user={this.state.user} setUser={this.setUser}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;