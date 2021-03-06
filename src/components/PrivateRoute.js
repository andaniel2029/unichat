import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {

  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser.user ? <Component {...props} /> : <Redirect to='/login' />
      }}
    >
    </Route>
  )
}
