/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
export const handleClick = (conn, i, j) => ({
  type: 'HANDLE_CLICK',
  conn,
  i,
  j
});

export const setCaro = (i, j) => ({
  type: 'SET_CARO',
  i,
  j
});

export const setTurn = isTurn => ({
  type: 'SET_TURN',
  isTurn
});

export const setPaired = isPaired => ({
  type: 'SET_PAIRED',
  isPaired
});

export const setMessage = message => ({
  type: 'SET_MESSAGE',
  message
});

export const reverse = () => ({
  type: 'REVERSE'
});

export const reset = () => {
  return {
    type: 'RESET'
  };
};

export const undo = step => ({
  type: 'UNDO',
  step
});

export const login = () => ({
  type: 'LOGIN'
});

export const logout = () => ({
  type: 'LOGOUT'
});
