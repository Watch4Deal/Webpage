import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Krudcup Logo" />
        </Link>
        <div className="navbar-title">
          <span>Watch 4 DEAL</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;