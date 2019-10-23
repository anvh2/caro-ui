/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Board from '../../components/game/Board';
import { Button } from 'react-bootstrap';
import * as action from '../../actions';
import '../../App.css';

var dName = '';
class Game extends Component {
  fetchUser = () => {
    const token = cookie.load('token');
    if (token === undefined) {
      return false;
    }

    fetch('http://localhost:55210/me', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.code === 1 && res.auth === true) {
          dName = res.data.display_name;
        }
      })
      .catch(err => {
        console.log('ERR', err);
      });

    return true;
  };

  render() {
    var { isAuthen } = this.props;
    console.log(isAuthen);
    if (!isAuthen) {
      isAuthen = this.fetchUser();
    }
    if (!isAuthen) {
      return <Redirect to="/login" />;
    }

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
      undoTo,
      logout
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
          <div>
            {dName === '' ? 'No Name' : dName}
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                cookie.remove('token');
                logout();
              }}
            >
              Logout
            </Button>
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
    isReverse: state.isReverse,
    isAuthen: state.isAuthen
  };
};

const mapDispathToProps = dispatch => {
  return {
    handleClick: (i, j) => dispatch(action.handleClick(i, j)),
    reset: () => dispatch(action.reset()),
    reverse: () => dispatch(action.reverse()),
    undoTo: step => dispatch(action.undoTo(step)),
    logout: () => dispatch(action.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Game);
