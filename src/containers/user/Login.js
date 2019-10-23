import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import * as action from '../../actions';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

var username = '';
var password = '';
class Login extends Component {
  constructor(props) {
    super(props);

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

  onSubmit = loginFunc => e => {
    e.preventDefault();
    fetch('http://localhost:55210/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token !== undefined) {
          cookie.save('token', data.token);
          loginFunc();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderRedirect(isAuthen) {
    if (isAuthen) {
      return <Redirect to="/" />;
    }
  }

  render() {
    const { isAuthen, login } = this.props;
    return (
      <div>
        {this.renderRedirect(isAuthen)}
        <Form id="login" method="POST" onSubmit={this.onSubmit(login)}>
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
    login: () => dispatch(action.login())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Login);
