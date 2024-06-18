import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Home: React.FC = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === '1';

  if (isLoggedIn) {
    return <Navigate to="/whiteboard" />;
  }

  return (
    <div className="container mt-4">
      <h1>Welcome to the Whiteboard App</h1>
      <Link to="/login" className="btn btn-primary mt-3">Login</Link>
      <Link to="/signup" className="btn btn-secondary mt-3 ml-3">Signup</Link>
    </div>
  );
};

export default Home;
