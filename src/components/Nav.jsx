import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import logo from './img.png'; // Ensure you have your logo image in the same directory

const Nav = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                <Link to="/" className="brand-name">Watch4Deals</Link>
            </div>
        </nav>
    );
}

export default Nav;
