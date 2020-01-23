import React, { useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';


function LandingPage() {
  const { user } = useContext(UserContext);
  const { refresh, loading, loggedIn } = useContext(AuthContext);
  useEffect(() => {
    refresh();
  })

  return (
    <>
      {
        loggedIn ? <Redirect push to={`/users/${user.username}/budget`} /> : ''
      }
      <div className='landingPageBackground'>
        {loading ?
          <h1>Loading...</h1> :
          <div className='hero'>
            <h2 className='banner'>Better Budget</h2>
            <Link to='/login' className='landingLink'>
              Login
            </Link>
            <Link to='/signUp' className='landingLink'>
              Sign Up
            </Link>
          </div>
        }
      </div>
    </>
  )
}

export default LandingPage;