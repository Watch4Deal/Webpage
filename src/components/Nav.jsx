import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="logo-link">
                    <img src='/img.png' alt="Logo" className="logo" />
                </Link>
                <Link to="/" className="brand-name">Watch4Deals</Link>
            </div>
        </nav>
    );
}

export default Nav;
