import React, { useState } from 'react';
import { Input, Form, Button, Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import Config from '../config/app.local.config';
import NavBar from '../components/navBar';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [userCreated, setUserCreated] = useState('');
  const [badPassword, setBadPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (password1 !== password2) {
      setBadPassword(true);
      setPassword1('');
      setPassword2('');
    } else {
      createUser();
    }
  }

  async function createUser() {
    const newUser = { username, password: password1, email };
    fetch(`${Config.websiteServiceUrl}users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      accepts: "application/json",
      body: JSON.stringify(newUser)
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json()
      })
      .then(() => {
        setUserCreated(true);
      })
      .catch(err => {
        message.error(`${err} We could not create your profile`);
      });
  }
  return (
    <>
      <NavBar />
      {userCreated ? <>
        <h1>Thank you for signing up!</h1>
        <h2><Link to='/login'>Log in here</Link></h2>
      </> :
        <>
        <div className='main-content'>
          <h1>Sign Up</h1>
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
                type="email"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                required
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                onChange={e => setPassword1(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                required
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Re-enter you password"
                onChange={e => setPassword2(e.target.value)}
              />
              {
                badPassword ? <h3>Your passwords did not match!</h3> : ''
              }

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Sign Up!
          </Button>
            </Form.Item>
          </Form>
          </div>
        </>
      }
    </>
  )
}

export default SignUp;