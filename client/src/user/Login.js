import React, { useContext, useState } from 'react';
import { Input, Form, Button, Icon, Row, notification } from 'antd';
import { UserContext } from '../contexts/UserContext';
import { Redirect, Link } from 'react-router-dom';
import Config from '../config/app.local.config';
import NavBar from '../components/navBar';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, updateUser, updateToken, token } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    authenticateUser();
  }

  async function authenticateUser() {
    const userInfo = { username, password };
    fetch(`${Config.websiteServiceUrl}auth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      accepts: "application/json",
      body: JSON.stringify(userInfo)
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(authUser => {
        updateToken(authUser.token);
        updateUser({ username: authUser.username });
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
    <>
      <NavBar />
      <div className='main-content'>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            <Input
              required
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              required
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Item>
          <Button htmlType="submit" className="login-form-button">
            Start Saving
            </Button>
          {
            loggedIn ? <Redirect push to={`/users/${user.username}/budget`} /> : ''
          }
        </Form>
      </div>
    </>
  )
}

export default Login;