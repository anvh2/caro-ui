/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
export const REGISTER_REQUESTED = 'REGISTER_REQUESTED';
export const REGISTER_SUCCEEDED = 'REGISTER_SUCCEEDED';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const REGISTER = (username, password, disName) => {
  return dispatch => {
    dispatch({
      type: REGISTER_REQUESTED
    });

    fetch('http://localhost:55210/user/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        display_name: disName
      })
    })
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          console.log(data);
          dispatch({
            type: REGISTER_SUCCEEDED,
            payload: data
          });
        }, 1000);
      })
      .catch(err =>
        dispatch({
          type: REGISTER_FAILED,
          payload: err
        })
      );
  };
};
