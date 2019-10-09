/* eslint-disable react/no-array-index-key */
import React from 'react';
import Square from './Square';

const Board = ({ board, onClick, isWin, winCells }) => {
  return (
    <div>
      {board.map((row, i) => {
        return (
          <div className="board-row" key={`r${i}`}>
            {row.map((col, j) => {
              let isHighlight = false;

              if (isWin) {
                winCells.map(cel => {
                  if (i === cel.x && j === cel.y) {
                    isHighlight = true;
                  }
                  return true;
                });
              }
              return (
                <Square
                  isHighlight={isHighlight}
                  value={col}
                  onClick={() => onClick(i, j)}
                  key={`c${j}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
