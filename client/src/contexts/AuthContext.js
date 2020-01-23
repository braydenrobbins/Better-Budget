import React, { createContext, useState, useContext } from 'react';
import Config from '../config/app.local.config';
import { UserContext } from '../contexts/UserContext';
export const AuthContext = createContext();

const AuthContextProvider = props => {
  const { updateUser } = useContext(UserContext);
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState('');
  const [loading, setLoading] = useState('');

  function refresh() {
    const _id = localStorage.getItem('uID');
    fetch(`${Config.websiteServiceUrl}auth/refresh/`, {
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
      body: JSON.stringify({ _id })
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        setLoading(false);
        return res.json()
      })
      .then(authUser => {
        console.log(authUser);
        updateToken(authUser.token);
        updateUser({ username: authUser.username, _id: authUser._id, email: authUser.email, budgets: [...authUser.budgets] });
        setLoggedIn(true);
      })
      .catch(err => {
        setLoading(false);
      });
  }

  function updateToken(updatedToken) {
    setToken(updatedToken);
  }

  function updateLoggedIn(updatedLoggedIn) {
    setLoggedIn(updatedLoggedIn);
  }

  function updateLoading(updatedLoading) {
    setLoading(updatedLoading);
  }



  return (
    <AuthContext.Provider value={{ token, updateToken, refresh, loading, updateLoading, loggedIn, updateLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;