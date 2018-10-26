import React, { Component } from "react";
import { Link } from 'react-router-dom';
 
const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="#">My Dashboard</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link class="nav-link" to="/">Home</Link>
                </li>       
                <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Responsive Pages</Link>
                    {/*<div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/pages">Browse Pages</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="/newpage">Add new page</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="/editpage">Edit page</a>
                    </div> */}
                </li>

                <li class="nav-item">
                    <Link class="nav-link" to="/pages">Pages</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/newpage">New Page</Link>
                </li>
                <li>
                    <Link class="nav-link" to="/editpage">Edit Page</Link>
                </li>

                <li class="nav-item">
                    <Link class="nav-link" to="/">Mobile Pages</Link>
                </li>
                <li>
                    <Link class="nav-link" to="/">Social Hub</Link>
                </li>
            </ul>
        </div>
    </nav>
  );
};

export default NavBar;