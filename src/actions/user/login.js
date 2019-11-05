/* eslint-disable no-undef */
import cookie from 'react-cookies';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const login = (username, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUESTED
    });

    fetch('http://localhost:55210/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          console.log(data);
          cookie.save('token', data.token);
          dispatch({
            type: LOGIN_SUCCEEDED,
            payload: data
          });
        }, 1000);
      })
      .catch(err =>
        dispatch({
          type: LOGIN_FAILED,
          payload: err
        })
      );
  };
};
