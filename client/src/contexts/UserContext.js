import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  function updateToken(updatedToken) {
    setToken(updatedToken);
  }

  return (
    <UserContext.Provider value={{ user, updateUser, token, updateToken }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
