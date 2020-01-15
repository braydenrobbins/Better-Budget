import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';

function UserPage() {
  const { user, updateUser } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <h1>{user.username}</h1>
    </>
  )
}

export default UserPage;