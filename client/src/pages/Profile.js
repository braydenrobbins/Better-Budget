import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';
import { AuthContext } from '../contexts/AuthContext';

function Profile() {
  const { user, token } = useContext(UserContext);
  const { refresh, loading, loggedIn } = useContext(AuthContext);

  useEffect(() => {
    refresh();
  }, [])
  return (
    <>
      {loading ?
        <h1>Loading...</h1> :
        <>
          <NavBar />
          <div className='main-content'>
            <h1>{user.username}</h1>
            <h2>{token}</h2>
          </div>
        </>
      }
    </>
  )
}

export default Profile;