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
import connectServer, {
  pairing,
  listeningData,
  listeningMsg
} from '../../plugins/socket';
import '../../App.css';

let conn;
let isListening = false;

class GameOnline extends Component {
  findMatch = (setTurn, setPaired, setMessage) => {
    conn = connectServer();
    // pairing
    pairing(conn, data => {
      console.log('data', data);
      conn.room = data.room;
      conn.status = 'paired';

      // set turn for player
      setTurn(data.isYourTurn);
    });
    // TODO: this will set without pair
    setPaired(true);

    // set message to chat box
    setMessage({ type: 'send', msg: 'Đang tìm trận...' });
  };

  render() {
    const {
      history,
      step,
      isReverse,
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
      messages
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
    // ensure listening is singleton
    if (isPaired && !isYourTurn && !isListening) {
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
            <div className="game-info">
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
                      this.findMatch(setTurn, setPaired, setMessage);
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
                    <Chat
                      messages={messages}
                      setMessage={setMessage}
                      conn={conn}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="history">
                    <ListGroup>{moves}</ListGroup>
                  </div>
                </Col>
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
    isReverse: state.isReverse,
    isAuthen: state.isAuthen,
    isYourTurn: state.isYourTurn,
    isPaired: state.isPaired,
    messages: state.messages
  };
};

const mapDispathToProps = dispatch => {
  return {
    handleClick: (conn, i, j) => dispatch(action.handleClick(conn, i, j)),
    setCaro: (i, j) => dispatch(action.setCaro(i, j)),
    setTurn: isTurn => dispatch(action.setTurn(isTurn)),
    setPaired: isPaired => dispatch(action.setPaired(isPaired)),
    setMessage: message => dispatch(action.setMessage(message)),
    reset: () => dispatch(action.reset()),
    reverse: () => dispatch(action.reverse()),
    undo: step => dispatch(action.undo(step))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(GameOnline);
