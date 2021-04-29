import React, { Component } from 'react';
import '../css/Header.css';

class Header extends Component {
    
    render() {
        return (
            <div>
                <header className="navbar navbar-dark sticky-top bg-success flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">everis</a>
                        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                             <span className="navbar-toggler-icon"></span>
                        </button>
                             <ul className="navbar-nav px-3">
                                  <li className="nav-item text-nowrap">
                                       <a className="nav-link" href="#">Sign out</a>
                                  </li>
                             </ul>

                </header>
                
                    
                </div>
                
             
        );
    }
}

export default Header;
