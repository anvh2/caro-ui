/* eslint-disable consistent-return */
/* eslint-disable no-continue */
import io from 'socket.io-client';

export const undoTo = (state, stepNumber) => {
  const { isWin } = state;
  if (isWin) {
    return;
  }

  return {
    ...state,
    step: stepNumber,
    isX: stepNumber % 2 === 0
  };
};

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

export const turnBot = state => {
  let { history, step, isWin, isX, winCells } = state;
  const { isTurn } = state;
  if (isTurn || isWin) {
    return state;
  }

  const newHistory = history.slice(0, step + 1);
  const current = newHistory[newHistory.length - 1];
  const squares = current.squares.slice();

  squares.map((row, idx) => {
    squares[idx] = [...current.squares[idx]];
    return true;
  });

  while (true) {
    const x = Math.floor(Math.random() * Math.floor(20));
    const y = Math.floor(Math.random() * Math.floor(20));

    if (!squares[x][y]) {
      squares[x][y] = isX ? 'X' : 'O';
      winCells = checkWinner(squares, x, y);
      if (winCells !== null) {
        isWin = true;
      }
      history = newHistory.concat([
        {
          squares,
          coordinate: { x, y }
        }
      ]);

      step = newHistory.length;
      isX = !isX;

      break;
    }
  }

  return {
    ...state,
    history,
    step,
    isX,
    isWin,
    winCells,
    isTurn: true
  };
};

export const handleClick = (state, i, j) => {
  let { history, step, isWin, isX, winCells } = state;
  const { isTurn } = state;
  if (!isTurn || isWin) {
    return state;
  }

  // // check square
  // if (!history[step].squares[i][j] && isWin) {
  //   return;
  // }

  const newHistory = history.slice(0, step + 1);
  const current = newHistory[newHistory.length - 1];
  const squares = current.squares.slice();

  squares.map((row, idx) => {
    squares[idx] = [...current.squares[idx]];
    return true;
  });

  if (!squares[i][j]) {
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
  }

  return {
    ...state,
    history,
    step,
    isX,
    isWin,
    winCells,
    isTurn: false
  };
};

export const reset = state => {
  let { history, step, isWin, winCells, isX } = state;
  history = [
    {
      squares: Array(20)
        .fill(null)
        .map(() => Array(20).fill(null))
    }
  ];
  step = 0;
  isWin = false;
  winCells = null;
  isX = true;

  return {
    ...state,
    history,
    step,
    isWin,
    winCells,
    isX,
    isReverse: false
  };
};

export const findMatch = state => {
  const socketIO = io.connect('http://localhost:55210');
  socketIO.on('matching', () => {
    socketIO.emit('find-event', { my: 'data' });
  });

  return {
    ...state,
    socket: socketIO
  };
};
