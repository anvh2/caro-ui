/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

let username = '';
let name = '';
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
        name = e.target.value;
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

    if (password !== confirm) {
      return;
    }

    fetch('http://localhost:55210/user/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        display_name: name
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 1) {
          this.setState({
            isSuccess: true
          });
          console.log('Success');
        } else {
          console.log('Fail');
        }
      })
      .catch(err => {
        console.log('some thing wrong');
        // log err to file
      });
  };

  render() {
    const { isSuccess } = this.state;
    if (isSuccess) {
      return <Redirect to="/login" />;
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
