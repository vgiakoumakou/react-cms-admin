import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaDesktop, FaMobileAlt, FaShareAlt } from 'react-icons/fa';
 
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="#"><img src="/ordereze_logo.jpeg"/> Admin Panel</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/"><FaHome /> Home</Link>
                </li>       
                <li className="nav-item active">
                    <Link className="nav-link" to="/pages"><FaDesktop /> Responsive Pages</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/"><FaMobileAlt /> Mobile Pages</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/"><FaShareAlt /> Social Hub</Link>
                </li>
            </ul>
        </div>
    </nav>
  );
};

export default NavBar;