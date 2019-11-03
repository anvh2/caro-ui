/* eslint-disable no-unused-vars */
import * as handlers from './online_handlers';

export const initGameOnlineState = {
  history: [
    {
      squares: Array(20)
        .fill(null)
        .map(() => Array(20).fill(null)),
      coordinate: null
    }
  ],
  step: 0,
  isWin: false,
  winCells: null,
  isX: true,
  isYourTurn: true
};

export const gameOnlineReducer = (state = initGameOnlineState, action) => {
  switch (action.type) {
    case 'HANDLE_CLICK':
      return handlers.handleClick(state, action.conn, action.i, action.j);
    case 'SET_CARO':
      return handlers.setCaro(state, action.i, action.j);
    case 'UNDO':
      return handlers.undo(state, action.step);
    default:
      return state;
  }
};
