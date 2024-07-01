import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.png" alt="Krudcup Logo" />
        </Link>
      </div>
      
      <div className="navbar-title">
        <span>Watch4Deal</span>
      </div>
      
      <div className="navbar-icons">
      </div>
    </nav>
  );
};

export default Navbar;
