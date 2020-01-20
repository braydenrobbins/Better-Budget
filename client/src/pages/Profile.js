import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';
import { Card } from 'antd';

function Profile() {
  const { user, updateUser, token } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <div className='main-content'>
        <h1>{user.username}</h1>
        <h2>{token}</h2>
      </div>
    </>
  )
}

export default Profile;