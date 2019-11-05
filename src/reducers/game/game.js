/* eslint-disable no-unused-vars */
import * as handlers from './handlers';

export const initGameOnlineState = {
  // game state
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
  isYourTurn: true,
  isPaired: false,
  isOffline: false,

  // chat state, 1 message has struct
  // {
  //   type: '',
  //   msg: ''
  // }
  messages: []
};

export const gameOnlineReducer = (state = initGameOnlineState, action) => {
  switch (action.type) {
    case 'HANDLE_CLICK':
      return handlers.handleClick(state, action.conn, action.i, action.j);
    case 'SET_CARO':
      return handlers.setCaro(state, action.i, action.j);
    case 'SET_TURN':
      return handlers.setTurn(state, action.isTurn);
    case 'SET_PAIRED':
      return handlers.setPaired(state, action.isPaired);
    case 'SET_MESSAGE':
      return handlers.setMessage(state, action.message);
    case 'UNDO':
      return handlers.undo(state, action.conn);
    case 'HANDLE_CLICK_OFFLINE':
      return handlers.handleClickOffline(state, action.i, action.j);
    case 'TURN_BOT':
      return handlers.turnBot(state);
    case 'KIND_GAME_OFFLINE':
      return handlers.setKindGameOffline(state);
    default:
      return state;
  }
};
