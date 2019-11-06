/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React, { Component } from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import * as action from '../../actions/user';
import Game from '../game/Game';
import { login } from '../../plugins/rest-api';
import Register from '../../components/user/Register';

let username = '';
let password = '';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRedirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    switch (e.target.id) {
      case 'username':
        username = e.target.value;
        break;
      case 'password':
        password = e.target.value;
        break;
      default:
    }
  };

  onSubmit = loginState => e => {
    e.preventDefault();
    login(
      {
        username,
        password
      },
      data => {
        console.log('data in login', data);
        if (data.code === 1) {
          cookie.save('token', data.token);
          loginState();
        }
      }
    );
  };

  render() {
    const { isAuthen } = this.props;
    const { loginState } = this.props;
    const auth = cookie.load('token');
    if (auth !== undefined) {
      loginState();
    }

    if (isAuthen) {
      return <Game />;
    }

    if (this.state.isRedirect) {
      return <Register />;
    }

    return (
      <div>
        <Form id="login" method="POST" onSubmit={this.onSubmit(loginState)}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              id="username"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              onChange={this.onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              this.setState({
                isRedirect: true
              });
            }}
          >
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthen: state.isAuthen
  };
};

const mapDispathToProps = dispatch => {
  return {
    loginState: () => dispatch(action.login())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Login);
