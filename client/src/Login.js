import React, { useContext, useState } from 'react';
import { Input, Form, Button, Icon, Row, notification } from 'antd';
import { UserContext } from './contexts/UserContext';
import { Redirect } from 'react-router-dom';
import Config from './config/app.local.config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, updateUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    authenticateUser();
  }

  async function authenticateUser() {
    const user = { username, password };
    fetch(`${Config.websiteServiceUrl}auth`, { method: "POST", body: JSON.stringify(user) })
      .then(res => {
        return res.json()
      })
      .then(verifiedUser => {
        updateUser({ username, budget: verifiedUser.budgetArray });
        setLoggedIn(true);
      })
      .catch(err => {
        notification["error"]({
          message: "Oh No! Something went wrong!",
          description: `Sorry about that! We could not sign you in.`
        });
      });
  }

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
          onChange={e => setUsername(e)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e)}
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