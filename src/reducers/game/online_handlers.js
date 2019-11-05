/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-continue */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import { sendData } from '../../plugins/socket';

const checkWinner = (squares, i, j) => {
  const currentCell = squares[i][j];
  const flags = [-4, -3, -2, -1, 1, 2, 3, 4];
  let counter = 1;
  const winCells = Array(5).fill(null);

  // check |
  for (let idx = 0; idx < flags.length; idx += 1) {
    let newRowIdx = i + flags[idx];
    if (newRowIdx < 0 || newRowIdx >= 20) {
      counter = 1;
      continue;
    }

    if (squares[newRowIdx][j] === currentCell) {
      counter += 1;
      if (counter === 5) {
        if (flags[idx] === -1) {
          // because next cell is the current node
          newRowIdx += 1;
        }
        if (
          newRowIdx + 1 < 20 &&
          (squares[newRowIdx + 1][j] !== null &&
            squares[newRowIdx + 1][j] !== currentCell) &&
          (squares[newRowIdx - 5][j] !== null &&
            squares[newRowIdx - 5][j] !== currentCell)
        ) {
          return false;
        }

        for (let k = 0; k < 5; k += 1) {
          winCells[k] = {
            x: newRowIdx - k,
            y: j
          };
        }
        return winCells;
      }
    } else {
      counter = 1;
    }
  }

  // check ---
  counter = 1;
  for (let idx = 0; idx < flags.length; idx += 1) {
    let newColIdx = j + flags[idx];
    if (newColIdx < 0 || newColIdx >= 20) {
      counter = 1;
      continue;
    }

    if (squares[i][newColIdx] === currentCell) {
      counter += 1;
      if (counter === 5) {
        if (flags[idx] === -1) {
          // because next cell is the current node
          newColIdx += 1;
        }
        if (
          squares[i][newColIdx + 1] !== null &&
          squares[i][newColIdx + 1] !== currentCell &&
          (squares[i][newColIdx - 5] !== null &&
            squares[i][newColIdx - 5] !== currentCell)
        ) {
          return false;
        }

        for (let k = 0; k < 5; k += 1) {
          winCells[k] = {
            x: i,
            y: newColIdx - k
          };
        }
        return winCells;
      }
    } else {
      counter = 1;
    }
  }

  // check \
  counter = 1;
  for (let idx = 0; idx < flags.length; idx += 1) {
    let newRowIdx = i + flags[idx];
    let newColIdx = j + flags[idx];
    if (newRowIdx < 0 || newRowIdx >= 20 || newColIdx < 0 || newColIdx >= 20) {
      counter = 1;
      continue;
    }

    if (squares[newRowIdx][newColIdx] === currentCell) {
      counter += 1;
      if (counter === 5) {
        if (flags[idx] === -1) {
          // because next cell is the current node
          newRowIdx += 1;
          newColIdx += 1;
        }
        if (
          newRowIdx + 1 < 20 &&
          newColIdx + 1 < 20 &&
          (squares[newRowIdx + 1][newColIdx + 1] !== null &&
            squares[newRowIdx + 1][newColIdx + 1] !== currentCell) &&
          (squares[newRowIdx - 5][newColIdx - 5] !== null &&
            squares[newRowIdx - 5][newColIdx - 5] !== currentCell)
        ) {
          return false;
        }

        for (let k = 0; k < 5; k += 1) {
          winCells[k] = {
            x: newRowIdx - k,
            y: newColIdx - k
          };
        }
        return winCells;
      }
    } else {
      counter = 1;
    }
  }

  // check /
  counter = 1;
  for (let idx = 0; idx < flags.length; idx += 1) {
    let newRowIdx = i + flags[idx];
    let newColIdx = j - flags[idx];

    if (newRowIdx < 0 || newRowIdx >= 20 || newColIdx < 0 || newColIdx >= 20) {
      counter = 1;
      continue;
    }

    if (squares[newRowIdx][newColIdx] === currentCell) {
      counter += 1;
      if (counter === 5) {
        if (flags[idx] === -1) {
          // because next cell is the current node
          newRowIdx += 1;
          newColIdx -= 1;
        }
        if (
          newRowIdx + 1 < 20 &&
          newColIdx - 1 >= 0 &&
          (squares[newRowIdx + 1][newColIdx - 1] !== null &&
            squares[newRowIdx + 1][newColIdx - 1] !== currentCell) &&
          (squares[newRowIdx - 5][newColIdx + 5] !== null &&
            squares[newRowIdx - 5][newColIdx + 5] !== currentCell)
        ) {
          return false;
        }

        for (let k = 0; k < 5; k += 1) {
          winCells[k] = {
            x: newRowIdx - k,
            y: newColIdx + k
          };
        }
        return winCells;
      }
    } else {
      counter = 1;
    }
  }
  return null;
};

// set caro into the board
export const setCaro = (state, i, j) => {
  let { history, isWin, winCells } = state;
  const { step, isX } = state;
  const newHistory = history.slice(0, step + 1);
  const current = newHistory[newHistory.length - 1];
  const squares = current.squares.slice();

  // copy previous board
  squares.map((row, idx) => {
    squares[idx] = [...current.squares[idx]];
    return true;
  });

  squares[i][j] = isX ? 'X' : 'O';
  winCells = checkWinner(squares, i, j);
  if (winCells !== null) {
    isWin = true;
  }
  history = newHistory.concat([
    {
      squares,
      coordinate: {
        x: i,
        y: j
      }
    }
  ]);
  return {
    ...state,
    history,
    step: newHistory.length,
    isX: !isX,
    isWin,
    winCells,
    isYourTurn: true
  };
};

export const handleClick = (state, conn, i, j) => {
  let { history, step, isWin, isX, winCells } = state;
  const { isYourTurn } = state;
  if (!isYourTurn || isWin) {
    return state;
  }

  if (!history[step].squares[i][j] && isWin) {
    return;
  }

  const newHistory = history.slice(0, step + 1);
  const current = newHistory[newHistory.length - 1];
  const squares = current.squares.slice();

  squares.map((row, idx) => {
    squares[idx] = [...current.squares[idx]];
    return true;
  });

  if (!squares[i][j] && !isWin) {
    squares[i][j] = isX ? 'X' : 'O';
    winCells = checkWinner(squares, i, j);
    if (winCells !== null) {
      isWin = true;
    }
    history = newHistory.concat([
      {
        squares,
        coordinate: {
          x: i,
          y: j
        }
      }
    ]);

    step = newHistory.length;
    isX = !isX;

    sendData(conn, { x: i, y: j });
    console.log(conn);
  }

  return {
    ...state,
    history,
    step,
    isX,
    isWin,
    winCells,
    isYourTurn: false
  };
};

export const setTurn = (state, isYourTurn) => {
  return {
    ...state,
    isYourTurn
  };
};

export const setPaired = (state, isPaired) => {
  return {
    ...state,
    isPaired
  };
};

export const setMessage = (state, message) => {
  let { messages } = state;
  messages = messages.concat(message);
  return {
    ...state,
    messages
  };
};

export const undo = () => {};
