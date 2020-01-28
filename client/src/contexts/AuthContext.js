import React, { createContext, useState, useContext } from 'react';
import Config from '../config/app.local.config';
import { UserContext } from '../contexts/UserContext';
import moment from 'moment';
import isEmpty from 'lodash';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const { user, updateUser, updateBudgets, updateCurrentBudget, currentMonth, updateTransactions } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState('');
  const [loading, setLoading] = useState('');

  function refresh() {
    if (!isEmpty(user)) return;
    fetch(`${Config.websiteServiceUrl}auth/`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
        'Access-Control-Allow-Origin': 'http://localhost:4000',
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
      },
      accepts: "application/json"
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json()
      })
      .then(authUser => {
        updateUser({ username: authUser.username, _id: authUser._id, email: authUser.email, budgets: authUser.budgets });
        updateBudgets(authUser.budgets);
        updateCurrentBudget(authUser.budgets.find(budget => budget.month === currentMonth));
        updateTransactions(authUser.budgets.find(budget => budget.month === currentMonth).transactions);
        if (!loggedIn) setLoggedIn(true);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }

  function updateLoggedIn(updatedLoggedIn) {
    setLoggedIn(updatedLoggedIn);
  }

  function updateLoading(updatedLoading) {
    setLoading(updatedLoading);
  }



  return (
    <AuthContext.Provider value={{ refresh, loading, updateLoading, loggedIn, updateLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;