/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  ListGroup,
  Image,
  ButtonToolbar,
  DropdownButton,
  Dropdown
} from 'react-bootstrap';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import Board from '../../components/board/Board';
import {
  ChooseGameBtnGroup,
  GameOnlineBtnGroup,
  PopupUndo
} from '../../components/utils';
import Chat from '../../components/Chat';
import * as action from '../../actions/game/game';
import connectServer, {
  pairing,
  listeningData,
  listeningMsg,
  listeningUndoAction,
  listeningSurrenderAction,
  listeningReconcileAction,
  sendUndoAction,
  sendSurrenderAction,
  sendReconcileAction
} from '../../plugins/socket';
import avatar from '../../avatar.jpg';
import '../../App.css';

let conn;
let isListening = false;

class Game extends Component {
  findMatch = (setTurn, setPaired, setMessage) => {
    conn = connectServer();
    // pairing
    pairing(conn, data => {
      console.log('data', data);
      conn.room = data.room;
      conn.status = 'paired';

      // set turn and status for player
      setTurn(data.isYourTurn);
      setPaired(true);
      setMessage({ type: 'send', msg: 'Đã kết nối!' });
    });

    // set message to chat box
    setMessage({ type: 'send', msg: 'Đang tìm trận...' });
  };

  render() {
    const {
      history,
      step,
      isWin,
      winCells,
      isX,
      isYourTurn,
      isPaired,
      handleClick,
      setCaro,
      setTurn,
      setPaired,
      setMessage,
      messages,
      handleClickOffline,
      turnBot,
      setKindGameOffline,
      undoTo,
      isOffline,
      logout,
      isAuthen,
      reset,
      reverse
    } = this.props;
    const current = history[step];

    const moves = history.map((currentStep, move) => {
      if (move === 0) {
        return true;
      }
      const desc = `Go to move #${move} (${currentStep.coordinate.x}, ${currentStep.coordinate.y})`;
      return (
        <ListGroup.Item key={`key_${move}`} onClick={() => undoTo(move)}>
          {desc}
        </ListGroup.Item>
      );
    });

    // this support for game online
    // after click, this will re-render and will listen
    // ensure listening is singleton
    if (isPaired && !isYourTurn && !isListening && !isOffline) {
      isListening = true;

      // listening incoming data
      listeningData(conn, data => {
        // parse json to object
        const obj = JSON.parse(data);
        console.log(obj);
        setCaro(obj.x, obj.y);
      });

      // listening incoming message
      listeningMsg(conn, msg => {
        // parse json to object
        const msgObj = JSON.parse(msg);
        console.log(msgObj);
        setMessage(msgObj);
      });

      // listening undo action of enemy
      listeningUndoAction(conn, data => {
        console.log('undo listen');
        console.log('undo action', data);
      });

      // listening surrender action of enemy
      listeningSurrenderAction(conn, data => {
        console.log('surrender action', data);
      });

      // listening reconcile action of enemy
      listeningReconcileAction(conn, data => {
        console.log('reconcile action', data);
      });
    }

    if (isOffline && !isYourTurn) {
      turnBot();
    }

    return (
      <Container bsPrefix="containerx">
        <Row bsPrefix="game">
          <Col sm={8}>
            {isOffline ? (
              <div className="game-board">
                <Board
                  board={current.squares}
                  onClick={(i, j) => handleClickOffline(i, j)}
                  isWin={isWin}
                  winCells={winCells}
                  isX={isX}
                />
              </div>
            ) : (
              <div />
            )}
            {isPaired ? (
              <div className="game-board">
                <Board
                  board={current.squares}
                  onClick={(i, j) => handleClick(conn, i, j)}
                  isWin={isWin}
                  winCells={winCells}
                  isX={isX}
                />
              </div>
            ) : (
              <div />
            )}
          </Col>
          <Col sm={4}>
            <div className="game-info">
              <Row>
                <div className="avatar">
                  <Col sm={2}>
                    <Image src={avatar} roundedCircle />
                  </Col>
                </div>
                <Col sm={8}>
                  <div className="display-info">
                    <Row>
                      <Col sm={6}>Hoang An</Col>
                      <Col sm={6}>
                        <div className="status">
                          {isWin ? 'Winner is: ' : 'Next player: '}
                          {isX ? 'X' : 'O'}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm={2}>
                  <DropdownButton variant="outline-secondary">
                    <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      eventKey="3"
                      onClick={() => {
                        logout();
                        cookie.remove('token');
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <Row>
                <div className="btn-group">
                  {isPaired ? (
                    <ButtonGroup aria-label="Basic Button Group">
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => {
                          console.log('surrender');
                          sendSurrenderAction(conn);
                        }}
                      >
                        Surrender
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          console.log('reconcile');
                          sendReconcileAction(conn);
                        }}
                      >
                        Reconcile
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          console.log('undo');
                          sendUndoAction(conn);
                        }}
                      >
                        Undo
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <div />
                  )}
                  {isOffline ? (
                    <ButtonGroup aria-label="Basic Button Group">
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => {
                          console.log('reset');
                          reset();
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          console.log('Reverse');
                          moves.reverse();
                          reverse();
                        }}
                      >
                        Reverse
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <div />
                  )}
                  {!isPaired && !isOffline ? (
                    <ButtonGroup aria-label="Basic Button Group">
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => {
                          this.findMatch(setTurn, setPaired, setMessage);
                        }}
                      >
                        Online
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          // TODO: it still ok if user click online and offline game type
                          setKindGameOffline();
                        }}
                      >
                        Offline
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <div />
                  )}
                </div>
              </Row>
              <Row>
                <Col sm={12}>
                  <div>
                    <Chat
                      messages={messages}
                      setMessage={setMessage}
                      conn={conn}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="history-container">
                  <Col sm={12}>
                    <div className="history">
                      <ListGroup>{moves}</ListGroup>
                    </div>
                  </Col>
                </div>
              </Row>
            </div>
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
    isAuthen: state.isAuthen,
    isYourTurn: state.isYourTurn,
    isPaired: state.isPaired,
    messages: state.messages,
    isOffline: state.isOffline
  };
};

const mapDispathToProps = dispatch => {
  return {
    handleClick: (conn, i, j) => dispatch(action.handleClick(conn, i, j)),
    setCaro: (i, j) => dispatch(action.setCaro(i, j)),
    setTurn: isTurn => dispatch(action.setTurn(isTurn)),
    setPaired: isPaired => dispatch(action.setPaired(isPaired)),
    setMessage: message => dispatch(action.setMessage(message)),
    handleClickOffline: (i, j) => dispatch(action.handleClickOffline(i, j)),
    turnBot: () => dispatch(action.turnBot()),
    setKindGameOffline: () => dispatch(action.setKindGameOffline()),
    undoTo: step => dispatch(action.undoTo(step)),
    reset: () => dispatch(action.reset()),
    reverse: () => dispatch(action.reverse()),
    logout: () => dispatch(action.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Game);
