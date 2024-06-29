import React from 'react';
import './Nav.css';
import { Link, useLocation } from 'react-router-dom';
import logo from './img.png'; // Ensure you have your logo image in the same directory

const Nav = () => {
    const location = useLocation();

    // Check if current location is home ("/")
    const isHome = location.pathname === '/';

    return (
        <nav className={`navbar ${isHome ? 'transparent' : 'black-bg'}`}>
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
