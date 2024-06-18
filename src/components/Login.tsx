import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    if (username === savedUsername && password === savedPassword) {
      localStorage.setItem('isLoggedIn', '1'); // Set isLoggedIn flag to '1'
      navigate('/whiteboard');
    } else {
      alert('Invalid username or password');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn flag from local storage
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
};

export default Login;

