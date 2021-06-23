
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav ,Dropdown,DropdownButton,ButtonGroup,NavDropdown} from "react-bootstrap";
import logo from "../../layouts/bg.jpg";
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import { IoIosPeople,IoIosPersonAdd,IoIosHome,IoIosPaper } from "react-icons/io"
import {IoCalendar,IoList} from "react-icons/io5"
import { AiFillHome } from "react-icons/ai"
import { FaHourglassEnd } from "react-icons/fa"
import {MdAccountBalanceWallet} from "react-icons/md"
import {FiSend} from "react-icons/fi"
function Sidebar({ color, image, routes, path, path2, path3, path4 ,path5}) {
  const userDetaile = JSON.parse(sessionStorage.getItem('user1')).firstname +" "+ JSON.parse(sessionStorage.getItem('user1')).lastname
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
  function icon(a){
    console.log(a==="IoIosPersonAdd")
    if(a==="IoIosPeople"){
      return(
        <IoList className="icon" style={{fontSize: "30px",marginRight: "11px"}}/>
      )
    }else if(a==="IoIosPersonAdd"){
      return(
        <IoIosPersonAdd className="icon" style={{fontSize: "30px",marginRight: "11px"}}/>
      )
      
    }else if(a==="IoIosHome"){
      return(
        <IoIosHome className="icon" style={{fontSize: "30px",marginRight: "11px"}}/>
      )
    }else if(a==="FaHourglassEnd"){
      return(
        <FaHourglassEnd className="icon" style={{fontSize: "30px",marginRight: "11px"}}/>
      )
    }else if(a==="IoCalendar"){
    return(
      <IoCalendar className="icon" style={{fontSize: "30px",marginRight: "11px"}}/>
    )
  }else if(a==="unit"){
    return(
      <IoIosPeople className="icon" style={{fontSize: "30px",marginRight: "11px"}}/>
    )  }else if(a==="MdAccountBalanceWallet"){
      return(
        <MdAccountBalanceWallet className="icon" style={{fontSize: "30px",marginRight: "11px"}}/>
      ) 
    }else if(a==="FiSend"){
      return(
        <FiSend className="icon" style={{fontSize: "30px",marginRight: "11px"}}/>
      ) 
    }else if(a==="IoIosPaper"){
      return(
        <IoIosPaper className="icon" style={{fontSize: "30px",marginRight: "11px"}}/>
      )
    }
  
  }
  return (
    
    <div className="sidebar" data-image={logo}  style={{overflow: "hidden"}}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + logo + ")",
        }}
      />
      <div className="sidebar-wrapper" style={{overflow: "hidden",backgroundColor:"#111",backgroundImage:" linear-gradient(to left,#24999e 22%, rgb(74 195 95) 100%)",/*backgroundImage:`url('../../layouts/bg.jpg')`*/}}>
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("assets/img/logo.png").default}
                alt="..."
                style={{maxWidth: "76%",maxHeight: "70px"}}
              />
             <p style={{width:"86%",margin: "16px 0px 0px 14px",textAlign:"initial"}}> {userDetaile} </p>
            </div>
          </a>
          
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (prop.layout === path || prop.layout === path2|| prop.layout === path3|| prop.layout ===path4 ){
           
              if(prop.path != path5 && prop.class!=undefined){
                  
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
                    
                    {icon(prop.class)}
                    <p style={{fontSize:"11px"}}>{translate(prop.name)}</p>
                  </NavLink>
                </li>
              );                          
                }
                else if(prop.path != path5){

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
