import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { isEmpty } from 'lodash';

function NavBar() {
  const [navVis, setNavVis] = useState(false);
  const { user, updateUser } = useContext(UserContext);

  function logoutUser() {
    updateUser('');
  }

  function toggleNav() {
    navVis ? setNavVis(false) : setNavVis(true);
  }

  return (
    <>
      {!isEmpty(user) ?
        <>
          <div className='nav-bar'>
            <Link to="/"><h1>Better Budget</h1></Link>
            <div className='btn-toggle-nav' onClick={toggleNav} />
          </div>
          <div className={`nav-main ${navVis ? 'nav-Visible' : ''}`}>
            <h1 onClick={toggleNav}>X</h1>
            <ul>
              <li><Link to={`/users/${user.username}`}>Profile</Link></li>
              <li><Link to={`/users/${user.username}/budget`}>Budget</Link></li>
              <li><Link to={`/users/${user.username}/transactions`}>Transactions</Link></li>
              <li onClick={() => logoutUser()}><Link to="/" >Logout</Link></li>
            </ul>
          </div>
        </> :
        <>
          <div className='nav-bar'>
            <Link to="/"><h1>Better Budget</h1></Link>
            <div className='btn-toggle-nav' onClick={toggleNav} />
          </div>
          <div className={`nav-main ${navVis ? 'nav-Visible' : ''}`}>
            <h1 onClick={toggleNav}>X</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Why Budget?</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signUp">Sign Up</Link></li>
            </ul>
          </div>
        </>
      }
    </>
  )
}

export default NavBar;