/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import Board from '../../components/board/Board';
import Chat from '../../components/Chat';
import * as action from '../../actions/game/game_online';
import '../../App.css';
import connectServer, { pairing, listening } from '../../plugins/socket';

let conn;

class GameOnline extends Component {
  constructor() {
    super();

    this.state = {
      isPair: false
    };
  }

  render() {
    const {
      history,
      step,
      isReverse,
      isWin,
      winCells,
      isX,
      isYourTurn,
      handleClick,
      setCaro
    } = this.props;
    const current = history[step];

    let moves = history.map((currentStep, move) => {
      if (move === 0) {
        return true;
      }
      const desc = `Go to move #${move} (${currentStep.coordinate.x}, ${currentStep.coordinate.y})`;
      return <ListGroup.Item key={`key_${move}`}>{desc}</ListGroup.Item>;
    });

    if (isReverse) {
      moves = moves.reverse();
    }

    // after click, this will re-render and will listen
    if (this.state.isPair) {
      listening(conn, data => {
        // parse json to object
        const obj = JSON.parse(data);
        console.log(obj);
        setCaro(obj.x, obj.y);
      });
    }

    return (
      <Container bsPrefix="containerx">
        <Row bsPrefix="game">
          <Col sm={8}>
            <div className="game-board">
              <Board
                board={current.squares}
                onClick={(i, j) => handleClick(conn, i, j)}
                isWin={isWin}
                winCells={winCells}
                isX={isX}
              />
            </div>
          </Col>
          <Col sm={4}>
            <Row>
              <Col sm={8}>
                <div className="status">
                  {isWin ? 'Winner is: ' : 'Next player: '}
                  {isX ? 'X' : 'O'}
                </div>
              </Col>
              <Col sm={4}>Avatar</Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => {
                    conn = connectServer();
                    // pairing
                    pairing(conn);
                    // TODO: this will set without pair
                    this.setState({
                      isPair: true
                    });
                  }}
                >
                  Find
                </Button>
              </Col>
              <Col sm={4}>
                <Button>Surrender</Button>
              </Col>
              <Col sm={4}>
                <Button>Undo</Button>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div>
                  <Chat />
                </div>
              </Col>
            </Row>
            <Row>
              <div className="history">
                <ListGroup>{moves}</ListGroup>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
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
    isYourTurn: state.isYourTurn
  };
};

const mapDispathToProps = dispatch => {
  return {
    handleClick: (conn, i, j) => dispatch(action.handleClick(conn, i, j)),
    setCaro: (i, j) => dispatch(action.setCaro(i, j)),
    reset: () => dispatch(action.reset()),
    reverse: () => dispatch(action.reverse()),
    undo: step => dispatch(action.undo(step))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(GameOnline);
