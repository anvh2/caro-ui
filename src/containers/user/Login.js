import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import * as action from '../../actions/user/login';

let username = '';
let password = '';
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

  onSubmit = login => e => {
    e.preventDefault();
    login(username, password);
  };

  render() {
    const { status, login } = this.props;
    if (status === 'waiting') {
      return <div>waiting</div>;
    }
    if (status === 'succeeded') {
      return <Redirect to="/" />;
    }
    return (
      <div>
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
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              // TODO: redirect to register page
              this.props.history.push('/register');
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
    status: state.status,
    data: state.data
  };
};

const mapDispathToProps = dispatch => {
  return {
    login: (username, password) => dispatch(action.login(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Login);
