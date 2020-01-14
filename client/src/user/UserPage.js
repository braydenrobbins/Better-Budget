import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function UserPage() {
  const { user, updateUser } = useContext(UserContext);
  return (
    <h1>{user.username}</h1>
  )
}

export default UserPage;