/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import React, { Component } from 'react';
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
        id: 25,
        username: 'anvh',
        password: '123',
        disName: 'Huynh Duc Chien'
      },
      data => {
        console.log('update', data);
      }
    );

    return <div />;
  }
}

export default Home;
