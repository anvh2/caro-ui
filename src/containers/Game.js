/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../components/Board';
import * as action from '../actions';
import '../App.css';

class Game extends Component {
  render() {
    const {
      history,
      step,
      isReverse,
      isWin,
      winCells,
      isX,
      handleClick,
      reset,
      reverse,
      undoTo
    } = this.props;
    const current = history[step];
    let classes;

    let moves = history.map((currentStep, move) => {
      if (move === 0) {
        return true;
      }
      const desc = `Go to move #${move} (${currentStep.coordinate.x}, ${currentStep.coordinate.y})`;
      if (step === move) {
        classes = 'btn-bold';
      }
      return (
        <button type="button" className={classes} onClick={() => undoTo(move)}>
          {desc}
        </button>
      );
    });

    if (isReverse) {
      moves = moves.reverse();
    }

    return (
      <div className="content">
        <div className="game">
          <div className="game-board">
            <Board
              board={current.squares}
              onClick={(i, j) => handleClick(i, j)}
              isWin={isWin}
              winCells={winCells}
              isX={isX}
            />
          </div>
          <div className="game-info">
            <div className="status">
              {isWin ? 'Winner is: ' : 'Next player: '}
              {isX ? 'X' : 'O'}
            </div>
            <div>
              <button type="button" className="button" onClick={reset}>
                Reset
              </button>

              <button
                type="button"
                className="button button-margin-left"
                onClick={reverse}
              >
                Reverse
              </button>
            </div>
            <div className="btn-group">{moves}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history,
    step: state.step,
    isX: state.isX,
    isWin: state.isWin,
    winCells: state.winCells,
    isReverse: state.isReverse
  };
};

const mapDispathToProps = dispatch => {
  return {
    handleClick: (i, j) => dispatch(action.handleClick(i, j)),
    reset: () => dispatch(action.reset()),
    reverse: () => dispatch(action.reverse()),
    undoTo: step => dispatch(action.undoTo(step))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Game);
