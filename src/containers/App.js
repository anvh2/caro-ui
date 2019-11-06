/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
// import Game from './game/Game';
import Login from './user/Login';
import Register from '../components/user/Register';
import Home from '../components/home';
import Caro from './game/Game';

class App extends Component {
  render() {
    let { isAuthen } = this.props;
    const auth = cookie.load('token');
    if (auth !== undefined) {
      isAuthen = true;
    } else {
      isAuthen = false;
    }
    if (!isAuthen) {
      return <Login />;
    }
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/caro">
            <Caro />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthen: state.isAuthen
  };
};

export default connect(mapStateToProps)(App);
