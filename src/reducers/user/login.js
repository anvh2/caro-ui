import {
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED
} from '../../actions/user/login';

export const initUserState = {
  data: {},
  status: ''
};

export const userReducer = (state = initUserState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        status: 'waiting'
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        data: action.payload,
        status: 'succeeded'
      };
    case LOGIN_FAILED:
      return {
        ...state,
        status: 'failed',
        err: action.payload
      };
    default:
      return state;
  }
};
