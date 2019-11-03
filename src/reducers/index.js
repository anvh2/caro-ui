import { combineReducers } from 'redux';
import { gameOnlineReducer, initGameOnlineState } from './game/online_game';
import { gameOfflineReducer, initGameOfflineState } from './game/bot_game';
import { userReducer, initUserState } from './user/login';

export default combineReducers({
  gameOfflineReducer,
  gameOnlineReducer,
  userReducer
});

const initState = {
  initGameOfflineState,
  initGameOnlineState,
  initUserState
};

export const combined = (state = initState, action) => {
  return {
    gameOfflineReducer: gameOfflineReducer(state.initGameOfflineState, action),
    gameOnlineReducer: gameOnlineReducer(state.initGameOnlineState, action),
    loginReducer: userReducer(state.initUserState, action)
  };
};
