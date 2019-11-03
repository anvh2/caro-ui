import * as handlers from './offline_handlers';

export const initGameOfflineState = {
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
  socket: null,
  isTurn: true,
  isAuthen: true
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

export const gameOfflineReducer = (state = initGameOfflineState, action) => {
  switch (action.type) {
    case 'HANDLE_CLICK':
      return handlers.handleClick(state, action.i, action.j);
    case 'TURN_BOT':
      return handlers.turnBot(state);
    case 'RESET':
      return emptyBoard();
    case 'REVERSE':
      return {
        ...state,
        isReverse: !state.isReverse
      };
    case 'MOVE':
      return move(state, action.payload);
    case 'UNDO':
      return handlers.undoTo(state, action.step);
    case 'FIND_MATCH':
      return state;
    default:
      return state;
  }
};
