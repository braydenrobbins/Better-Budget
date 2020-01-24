import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { loggedIn, refresh } = useContext(UserContext);
  useEffect(() => {
    refresh();
  }, []);
  return (
    <Route
      {...rest}
      render={props =>
        !loggedIn ? (
          < Redirect to='/login' />
        ) : (
            < Component {...props} />
          )
      }
    />
  );
}

export default PrivateRoute;