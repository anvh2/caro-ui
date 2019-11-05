import { combineReducers } from 'redux';
import { gameOnlineReducer, initGameOnlineState } from './game/game';
import { userReducer, initUserState } from './user/login';

export default combineReducers({
  gameOnlineReducer,
  userReducer
});

const initState = {
  initGameOnlineState,
  initUserState
};

export const combined = (state = initState, action) => {
  return {
    gameOnlineReducer: gameOnlineReducer(state.initGameOnlineState, action),
    loginReducer: userReducer(state.initUserState, action)
  };
};
