import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { NavContext } from '../contexts/NavContext';
import { isEmpty } from 'lodash';
import OutsideAlerter from "../components/OutsideAlerter";

function NavBar() {
  // const [navVis, setNavVis] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const { toggleNav, navVis } = useContext(NavContext);

  function logoutUser() {
    updateUser('');
  }

  return (
    <OutsideAlerter>
      {!isEmpty(user) ?
        <>
          <div className='nav-bar'>
            <Link to="/"><h1>Better Budget</h1></Link>
            <div className='btn-toggle-nav' onClick={toggleNav} />
          </div>
          <div className={`nav-main ${navVis ? 'nav-Visible' : ''}`}>
            <h1 onClick={toggleNav}>X</h1>
            <ul>
              <li onClick={() => toggleNav()}><Link to={`/users/${user.username}`}>Profile</Link></li>
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