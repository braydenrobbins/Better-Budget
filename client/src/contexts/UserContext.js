import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({});

  const updateUser = updatedUser => {
    setUser(updatedUser);
  }

  return (
    <UserContext.Provider value={{ user: user, updateUser: updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
