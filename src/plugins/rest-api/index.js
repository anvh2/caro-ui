/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import cookie from 'react-cookies';

export const login = (userData, callback) => {
  fetch('http://localhost:55210/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userData.username,
      password: userData.password
    })
  })
    .then(res => res.json())
    .then(data => {
      callback(data);
    })
    .catch(err => console.log('ERR', err));
};

export const register = (userData, callback) => {
  fetch('http://localhost:55210/user/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
      display_name: userData.disName
    })
  })
    .then(res => res.json())
    .then(data => {
      callback(data);
    })
    .catch(err => console.log('ERR', err));
};

export const fetchProfile = callback => {
  const token = cookie.load('token');
  if (token === undefined) {
    return false;
  }

  fetch('http://localhost:55210/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.code === 1 && res.auth === true) {
        callback(res);
      }
    })
    .catch(err => {
      console.log('ERR', err);
    });

  return true;
};

export const updateProfile = (userData, callback) => {
  //   if (userData.password !== userData.confirm) {
  //     return false;
  //   }

  fetch('http://localhost:55210/user/update', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
      display_name: userData.disName
    })
  })
    .then(res => res.json())
    .then(data => {
      callback(data);
    })
    .catch(err => console.log('ERR', err));

  return true;
};
