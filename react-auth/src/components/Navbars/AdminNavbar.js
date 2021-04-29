/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button ,SplitButton,ButtonGroup} from "react-bootstrap";
import 'components/Navbars/navbar.css'
import routes from "routes.js";

function Header() {
  const location = useLocation();
  const userDetaile = JSON.parse(sessionStorage.getItem('user1')).firstname +" "+ JSON.parse(sessionStorage.getItem('user1')).lastname
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };
  const handleClick = (e) => {
    if(e){
      
    sessionStorage.setItem('user','');
    sessionStorage.setItem('token','');
    sessionStorage.setItem('role','');
    e.preventDefault()
    }
    
  }
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >
                
                <span className="d-lg-none ml-1">Dashboard</span>
              </Nav.Link>
            </Nav.Item>
            
           
          </Nav>
          <Nav className="ml-auto" navbar>
            
              {/*
              
              <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                data-toggle="dropdown"
                id="dropdown-67443507"
                variant="default"
                className="m-0"
              >
                <i className="nc-icon nc-stre-down"></i>
                
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Notification 1
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Notification 2
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Profile 
                </Dropdown.Item>
                <Dropdown.Item
                   href="/admin/password/change"
                >
                  Change password
                </Dropdown.Item>
                <Dropdown.Item
                  href="/"
                  onClick={()=> sessionStorage.clear()}
                >
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              */}
             
            
          
           
          <Dropdown as={ButtonGroup}>
            <Button style={{border:"none",fontSize: "17px"}} >{userDetaile}</Button>
            <Dropdown.Toggle split variant="muted" style={{border:"none",top: "-8px"}}  id="dropdown-custom-2" />
            <Dropdown.Menu className="super-colors">
              <Dropdown.Item eventKey="1" href="/admin/password/user">Profile</Dropdown.Item>
              <Dropdown.Item eventKey="2" href="/admin/password/change">Change password</Dropdown.Item>
              
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" href="/" onClick={()=> sessionStorage.clear()}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            {/*<Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                href="/admin/password/change"
              >
                <span className="no-icon">Change password</span>
              </Nav.Link>
            </Nav.Item>
            
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="/"
                onClick={()=> sessionStorage.clear()}
              >
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Nav.Item>*/ }
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
