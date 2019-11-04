/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import * as action from '../../actions/game/game_online';

class Home extends Component {
  render() {
    return (
      <div>
        <Button
          variant="primary"
          type="button"
          onClick={() => {
            const socket = io.connect('http://localhost:55210');

            socket.emit('chat', 'hello');
          }}
        >
          Find Match
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispathToProps = dispatch => {
  return {
    // findMatch: data => dispatch(action.findMatch(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispathToProps
)(Home);
