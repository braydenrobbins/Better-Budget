import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';

function Profile() {
  const { user, token } = useContext(UserContext);
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