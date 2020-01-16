import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';
import { Card } from 'antd';

function Budget() {
  const { user, updateUser } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <div className='main-content'>
        <h1>Your Budget</h1>
      </div>
    </>
  )
}

export default Budget;