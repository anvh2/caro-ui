/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import * as action from '../../actions/game/game';
import {
  login,
  register,
  fetchProfile,
  updateProfile
} from '../../plugins/rest-api';

class Home extends Component {
  render() {
    login({ username: 'anvh', password: '123' }, data => {
      console.log('login', data);
    });

    register(
      { uesrname: 'anvh100', password: '123', disName: 'Hoang An' },
      data => {
        console.log('register', data);
      }
    );

    fetchProfile(data => {
      console.log('fetch', data);
    });

    updateProfile(
      {
        id: 41,
        username: 'anvh',
        password: '123',
        disName: 'Vo Hoang An'
      },
      data => {
        console.log('update', data);
      }
    );

    return (
      <div>
        <Button
          variant="primary"
          type="button"
          onClick={() => {
            console.log('click');
          }}
        >
          Find Match
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispathToProps = dispatch => {
  return {
    // findMatch: data => dispatch(action.findMatch(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispathToProps
)(Home);
