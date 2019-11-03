/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  ButtonToolbar,
  DropdownButton,
  Dropdown,
  Image,
  Button,
  ListGroup
} from 'react-bootstrap';
import Board from '../../components/board/Board';
import * as action from '../../actions/game/game_offline';
import '../../App.css';
import Chat from '../../components/Chat';

const dName = '';
class GameOffline extends Component {
  // fetchUser = () => {
  //   const token = cookie.load('token');
  //   if (token === undefined) {
  //     return false;
  //   }

  //   fetch('http://localhost:55210/me', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.code === 1 && res.auth === true) {
  //         dName = res.data.display_name;
  //       }
  //     })
  //     .catch(err => {
  //       console.log('ERR', err);
  //     });

  //   return true;
  // };

  render() {
    const {
      history,
      step,
      isReverse,
      isWin,
      winCells,
      isX,
      isTurn,
      handleClick,
      turnBot,
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
      return <ListGroup.Item key={`key_${move}`}>{desc}</ListGroup.Item>;
    });

    if (isReverse) {
      moves = moves.reverse();
    }

    if (!isTurn) {
      turnBot();
    }

    return (
      <div className="container">
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
          <div className="game-info" />
          {/* <ButtonToolbar
            title={<Image src="../../../pulic/avatar.png" roundedCircle />}
          >
            <DropdownButton>
              <Dropdown.Item eventKey="1" active>
                Profile
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3">Logout</Dropdown.Item>
            </DropdownButton>
          </ButtonToolbar> */}
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
            <div className="history">
              <ListGroup>{moves}</ListGroup>
            </div>
          </div>
          <div>
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
    isAuthen: state.isAuthen,
    isTurn: state.isTurn
  };
};

const mapDispathToProps = dispatch => {
  return {
    handleClick: (i, j) => dispatch(action.handleClick(i, j)),
    turnBot: () => dispatch(action.turnBot()),
    reset: () => dispatch(action.reset()),
    reverse: () => dispatch(action.reverse()),
    undoTo: step => dispatch(action.undo(step)),
    logout: () => dispatch(action.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(GameOffline);
