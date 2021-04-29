import React, { Component } from 'react';
import '../css/Header.css';


class Navsbar extends Component {
  componentDidMount() {
  /*  $(document).ready(function () {

        $('.nav li a').click(function(e) {

            $('.nav li.active').removeClass('active');
    
            var $parent = $(this).parent();
            $parent.addClass('active');
            e.preventDefault()
        //e.preventDefault();
    });
});*/

}

    render() {
        return (
          
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" >
                    <div className="position-sticky pt-3">
                      <ul className="navbar-nav flex-column">
                        <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="/">
                            <span data-feather="home"></span>
                            Dashboard
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/add-user/_add">
                            <span data-feather="file"></span>
                            Add Employee
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            <span data-feather="shopping-cart"></span>
                            Demande du conge
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            <span data-feather="users"></span>
                            jour féries
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            <span data-feather="bar-chart-2"></span>
                            Reports
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            <span data-feather="layers"></span>
                            Integrations
                          </a>
                        </li>
                      </ul>   
                                    
                    </div>
                </nav>
             
        );
    }
}

export default Navsbar;