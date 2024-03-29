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
  isAuthen: false,
  isReverse: false,

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
    case 'HANDLE_CLICK_OFFLINE':
      return handlers.handleClickOffline(state, action.i, action.j);
    case 'TURN_BOT':
      return handlers.turnBot(state);
    case 'KIND_GAME_OFFLINE':
      return handlers.setKindGameOffline(state);
    case 'UNDO_TO':
      return handlers.undoTo(state, action.step);
    case 'LOGIN':
      return handlers.login(state);
    case 'LOGOUT':
      return handlers.logout(state);
    case 'RESET':
      return handlers.reset(state);
    case 'REVERSE':
      return handlers.reverse(state);
    default:
      return state;
  }
};
