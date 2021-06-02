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
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
function Sidebar({ color, image, routes,path ,path2,path3,path4,path5}) {
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
    
    <div className="sidebar"   style={{overflow: "hidden"}}>
      <div
        className="sidebar-background"
        style={{
          
        }}
      />
      <div className="sidebar-wrapper" style={{overflow: "hidden",backgroundColor:"#111"}}>
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
            if (prop.layout === path || prop.layout === path2|| prop.layout === path3|| prop.layout ===path4 ){

              if(prop.path != path5){

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
                    <p style={{fontSize:"11px"}}>{translate(prop.name)}</p>
                  </NavLink>
                </li>
              );                          
                }} 
            return null;
          })}

        </Nav>
           
            
      </div>
    </div>
  );
}

export default Sidebar;
