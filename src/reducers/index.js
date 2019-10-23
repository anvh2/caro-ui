import * as api from './api';

const initState = {
  history: [
    {
      squares: Array(20)
        .fill(null)
        .map(() => Array(20).fill(null)),
      coordinate: null
    }
  ],
  step: 0,
  isX: true,
  isWin: false,
  winCells: null,
  isReverse: false,
  isAuthen: false,
};

const emptyBoard = () => {
  return {
    history: [
      {
        squares: Array(20)
          .fill(null)
          .map(() => Array(20).fill(null))
      }
    ],
    step: 0,
    isWin: false,
    winCells: null,
    isX: true
  };
};

const move = (board, { player, row, col }) => {
  const updated = board.slice();

  updated[row][col] = player;

  return updated;
};

const boardReducer = (state = initState, action) => {
  switch (action.type) {
    case 'HANDLE_CLICK':
      return api.handleClick(state, action.i, action.j);
    case 'RESET':
      return emptyBoard();
    case 'REVERSE':
      return {
        ...state,
        isReverse: !state.isReverse
      };
    case 'MOVE':
      return move(state, action.payload);
    case 'UNDO_TO':
      return api.undoTo(state, action.step);
    case 'LOGIN':
      return {
        ...state,
        isAuthen: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthen: false
      };
    default:
      return state;
  }
};

export default boardReducer;
