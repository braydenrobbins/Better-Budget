import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState('');

  function updateUser(UpdatedUser) {
    setUser(UpdatedUser);
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
