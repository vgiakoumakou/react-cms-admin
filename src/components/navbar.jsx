import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaDesktop, FaMobileAlt, FaShareAlt, FaUser, FaCaretDown, FaSignOutAlt } from 'react-icons/fa';
 
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mainNavbar">
        <Link className="navbar-brand" to="/" onClick={(e) => e.preventDefault()}><img src="/ordereze_logo.jpeg"/> Admin Panel</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={(e) => e.preventDefault()}><FaHome /> Home</Link>
                </li>       
                <li className="nav-item active">
                    <Link className="nav-link" to="/pages"><FaDesktop /> Responsive Pages</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={(e) => e.preventDefault()}><FaMobileAlt /> Mobile Pages</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/" onClick={(e) => e.preventDefault()}><FaShareAlt /> Social Hub</Link>
                </li>
            </ul>
            <ul className="navbar-nav navbar-dark">
                <li className="nav-item userLoggedIn">
                    <Link className="nav-link" to="/" onClick={(e) => e.preventDefault()}><FaUser /> Maria Papadopoulou <FaCaretDown /></Link>
                </li>
                <li className="nav-item userLogOut">
                    <Link className="nav-link" to="/" onClick={(e) => e.preventDefault()}><FaSignOutAlt /> Sign Out</Link>
                </li>
            </ul>
        </div>
    </nav>
  );
};

export default NavBar;