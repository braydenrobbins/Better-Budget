import React, { useContext, useState } from 'react';
import { Input, Form, Button, Icon, Checkbox, Row } from 'antd';
import { UserContext } from './contexts/UserContext';
import { Redirect } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, updateUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    authenticateUser();
  }

  function authenticateUser() {
    const budget = [];
    //ask backend to login user
    updateUser({ username, budget });
    setLoggedIn(true);
  }


  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Row>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Row>
        <Row>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Row>
      </Form.Item>
      {
        loggedIn ? <Redirect push to={`/${user.username}`} /> : ''
      }
    </Form>
  )
}

export default Login;