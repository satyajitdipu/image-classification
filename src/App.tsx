import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Whiteboard from './components/Whiteboard';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ImageUpload from './components/ImageUploader'; // Assuming you have an ImageUpload component
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === '1';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.reload(); // Refresh the page to reflect the change
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Satyajit</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {!isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/whiteboard">Whiteboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/upload">Upload Image</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/whiteboard" element={<Whiteboard />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
