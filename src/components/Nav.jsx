//make a nav bar  with just a name watch4deals
import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="brand">Watch4Deals</Link>
            </div>
            
        </nav>
    );
}

export default Nav;
