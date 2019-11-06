/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Login from '../../containers/user/Login';
import { register } from '../../plugins/rest-api';

let username = '';
let disName = '';
let password = '';
let confirm = '';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      isSuccess: false
    };
  }

  onChange = e => {
    switch (e.target.id) {
      case 'username':
        username = e.target.value;
        break;
      case 'name':
        disName = e.target.value;
        break;
      case 'password':
        password = e.target.value;
        break;
      case 'confirm':
        confirm = e.target.value;
        break;
      default:
    }
  };

  submit = e => {
    e.preventDefault();

    if (password === confirm) {
      register({ username, password, disName }, data => {
        this.setState({
          isSuccess: true
        });
      });
    }
  };

  render() {
    const { isSuccess } = this.state;
    if (isSuccess) {
      return <Login />;
    }
    return (
      <Form id="register" method="POST" onSubmit={this.submit}>
        <Form.Group controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            id="username"
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            id="name"
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            id="confirm"
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default Register;
