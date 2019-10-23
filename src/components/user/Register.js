import React from 'react';
import { Form, Button } from 'react-bootstrap';

var username = '';
var name = '';
var password = '';
var confirm = '';

const onChange = e => {
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

const submit = e => {
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
      console.log(data);
      if (data.code === 1) {
        console.log('Success');
      } else {
        console.log('Fail');
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const Register = () => {
  return (
    <Form id="register" method="POST" onSubmit={submit}>
      <Form.Group controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          id="username"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId="formGroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          id="name"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          id="password"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId="formGroupConfirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          id="confirm"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Register;
