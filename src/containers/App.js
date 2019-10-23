import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './game/Game';
import Login from './user/Login';
import Register from '../components/user/Register';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Game />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
