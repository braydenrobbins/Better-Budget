import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { NavContext } from '../contexts/NavContext';
import OutsideAlerter from "../components/OutsideAlerter";
import config from '../config/app.local.config';
import { AuthContext } from '../contexts/AuthContext';

function NavBar() {
  const { user, updateUser, updateTransactions, updateCurrentBudget, updateBudgets, updateCurrentMonth } = useContext(UserContext);
  const { loggedIn, updateLoggedIn } = useContext(AuthContext);
  const { toggleNav, navVis } = useContext(NavContext);

  function logoutUser() {
    fetch(`${config.websiteServiceUrl}auth/`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
        'Access-Control-Allow-Origin': 'http://localhost:4000',
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
      },
      accepts: "application/json"
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        updateUser({});
        updateLoggedIn(false);
        updateTransactions([]);
        updateCurrentBudget({});
        updateCurrentMonth('');
        updateBudgets([]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <OutsideAlerter>
      {loggedIn ?
        <>
          <div className='nav-bar'>
            <Link to="/"><h1>Better Budget</h1></Link>
            <div className='btn-toggle-nav' onClick={toggleNav} />
          </div>
          <div className={`nav-main ${navVis ? 'nav-Visible' : ''}`}>
            <h1 onClick={toggleNav}>X</h1>
            <ul>
              {/* <li onClick={() => toggleNav()}><Link to={`/users/${user.username}`}>Profile</Link></li> */}
              <li onClick={() => toggleNav()}><Link to={`/users/${user.username}/budget`}>Budgets</Link></li>
              <li onClick={() => toggleNav()}><Link to={`/users/${user.username}/newBudget`}>New Budget</Link></li>
              <li onClick={() => toggleNav()}><Link to={`/users/${user.username}/transactions`}>Transactions</Link></li>
              <li onClick={() => { logoutUser(); toggleNav() }}><Link to="/" >Logout</Link></li>
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
              <li onClick={() => toggleNav()}><Link to="/">Home</Link></li>
              <li onClick={() => toggleNav()}><Link to="/">Why Budget?</Link></li>
              <li onClick={() => toggleNav()}><Link to="/login">Login</Link></li>
              <li onClick={() => toggleNav()}><Link to="/signUp">Sign Up</Link></li>
            </ul>
          </div>
        </>
      }
    </OutsideAlerter>
  )
}

export default NavBar;