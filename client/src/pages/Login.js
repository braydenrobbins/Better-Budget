import React, { useContext, useState } from 'react';
import { Input, Form, Button, Icon, message} from 'antd';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import Config from '../config/app.local.config';
import NavBar from '../components/navBar';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  let isEmpty = require('lodash/isEmpty');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, updateUser, currentMonth, updateCurrentMonth, updateBudgets, currentBudget, updateCurrentBudget, updateTransactions } = useContext(UserContext);
  const { loggedIn, updateLoggedIn } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    authenticateUser();
  }

  async function authenticateUser() {
    const userInfo = { username, password };
    fetch(`${Config.websiteServiceUrl}auth/`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
        'Access-Control-Allow-Origin': 'http://localhost:4000',
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
      },
      accepts: "application/json",
      body: JSON.stringify(userInfo)
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(authUser => {
        updateUser({ username: authUser.username, _id: authUser._id, email: authUser.email, budgets: authUser.budgets });
        updateBudgets(authUser.budgets);
        updateCurrentBudget(authUser.budgets.find(budget => budget.month === currentMonth) || '');
        updateTransactions(authUser.budgets.find(budget => budget.month === currentMonth)?.transactions || '');
        updateLoggedIn(true);
      })
      .catch(err => {
        message.error(`${err} We could not sign you in`);
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
          {loggedIn ? <Redirect push to={isEmpty(user.budgets) ? `/users/${user.username}/newBudget` : `/users/${user.username}/budget`} /> : ''}
        </Form>
      </div>
    </>
  )
}

export default Login;