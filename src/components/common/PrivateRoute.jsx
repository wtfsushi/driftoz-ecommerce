import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="card glass p-8 text-center">
                <div className="animate-spin w-10 h-10 border-4 border-accent-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-neutral-400">Checking your session…</p>
              </div>
            </div>
          );
        }

        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
