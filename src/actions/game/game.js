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

export const login = () => ({
  type: 'LOGIN'
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const setKindGameOffline = () => ({
  type: 'KIND_GAME_OFFLINE'
});

export const handleClickOffline = (i, j) => ({
  type: 'HANDLE_CLICK_OFFLINE',
  i,
  j
});

export const turnBot = () => ({
  type: 'TURN_BOT'
});

export const undoTo = step => ({
  type: 'UNDO_TO',
  step
});

export const reverse = () => ({
  type: 'REVERSE'
});

export const reset = () => {
  return {
    type: 'RESET'
  };
};
