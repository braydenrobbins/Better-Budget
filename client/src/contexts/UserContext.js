import React, { createContext, useState } from 'react';
import Config from '../config/app.local.config';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState('');
  const [loading, setLoading] = useState('');

  function refresh() {
    const _id = localStorage.getItem('uID');
    fetch(`${Config.websiteServiceUrl}auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      accepts: "application/json",
      body: JSON.stringify(_id)
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

  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  function updateToken(updatedToken) {
    setToken(updatedToken);
  }

  return (
    <UserContext.Provider value={{ user, updateUser, token, updateToken, refresh, loggedIn, loading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
