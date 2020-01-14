import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

function LandingPage() {

  return (
    <>
      <div className='landingPageBackground'>
        <div className='hero'>
          <h2 className='banner'>Better Budget</h2>
          <Link to='/login' className='navLink'>
            Login
          </Link>
          <Link to='/signUp' className='navLink'>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  )
}

export default LandingPage;