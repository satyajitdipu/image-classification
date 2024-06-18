import React from 'react';
import keycloak from '../services/keycloak';

const AuthButton: React.FC = () => {
  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  return (
    <div>
      {keycloak.authenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

export default AuthButton;
