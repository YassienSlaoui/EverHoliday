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
import { useLocation, NavLink } from "react-router-dom";

import { Nav ,Dropdown,DropdownButton,ButtonGroup,NavDropdown} from "react-bootstrap";

import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes,path ,path2,path3,path4}) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  function hide(){
    let x =document.getElementById(".x1");
    if(x){
      if(x.style.display==="none"){
      x.style.display==="block"
    }else{
      x.style.display==="none"
    }
    }
    
  } 
  return (
    <div className="sidebar" data-image={image} data-color={color} style={{overflow: "hidden"}}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("assets/img/everis.svg").default}
                alt="..."
                style={{maxWidth:100+"%",maxHeight:88+"px"}}
              />
            </div>
          </a>
          
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (prop.layout === path || prop.layout === path2|| prop.layout === path3|| prop.layout ===path4)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
                        
        {/*[ 'right'].map((direction) => (
          <NavDropdown
            as={ButtonGroup}
            key={direction}
            
            id={`dropdown-button-drop-${direction}`}
            drop={direction}
            variant="secondary"
            title={` Drop ${direction} `}
          >
            <NavDropdown.Item className="nav-link" eventKey="1">Action</NavDropdown.Item>
            <NavDropdown.Item className="nav-link" eventKey="2">Another action</NavDropdown.Item>
            <NavDropdown.Item className="nav-link" eventKey="3">Something else here</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="nav-link" eventKey="4">Separated link</NavDropdown.Item>
          </NavDropdown>
        ))*/}
  
        </Nav>
           
            
      </div>
    </div>
  );
}

export default Sidebar;
