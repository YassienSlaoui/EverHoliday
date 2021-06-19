
import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button ,SplitButton,ButtonGroup} from "react-bootstrap";
import 'components/Navbars/navbar.css'
import routes from "routes.js";
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import { BsBellFill } from "react-icons/bs"
import { IoLanguageSharp } from "react-icons/io5"
import { FaUser } from "react-icons/fa"

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
                
               
              </Nav.Link>
            </Nav.Item>
     
          </Nav>
        
          <Nav className="ml-auto" navbar>
         <Dropdown as={ButtonGroup}>  
              <Dropdown.Toggle split variant="muted" style={{ border: "none", top: "-8px"
             }} id="dropdown-custom-2" ><BsBellFill className="icon" style={{color:'#93A603',fontSize:'25px'}}/></Dropdown.Toggle>
            
          </Dropdown>
            <Dropdown as={ButtonGroup}>  
            <Dropdown.Toggle split variant="muted" style={{border:"none",top: "-8px"}}  id="dropdown-custom-2" ><IoLanguageSharp className="icon" style={{color:'#93A603',fontSize:'25px'}}/></Dropdown.Toggle>
            <Dropdown.Menu className="super-colors"style={{ left:"-80px"}}>
              <Dropdown.Item eventKey="3" >
                <Button onClick={()=>{window.location.reload();sessionStorage.setItem('lang','En')}} variant="light">En</Button>
                <Button onClick={()=>{window.location.reload();sessionStorage.setItem('lang','Fr')}} variant="light">Fr</Button>
                <Button onClick={()=>{window.location.reload();sessionStorage.setItem('lang','Sp')}} variant="light">Sp</Button>
              </Dropdown.Item>
             </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup}>
              
            <Dropdown.Toggle split variant="muted" style={{border:"none",top: "-8px" }}  id="dropdown-custom-2" ><FaUser className="icon" style={{color:'#93A603',fontSize:'25px'}}/></Dropdown.Toggle>
            <Dropdown.Menu className="super-colors" style={{ left:"-65px"}}>
              <Dropdown.Item eventKey="1" href="/admin/password/user">{translate('Profile')}</Dropdown.Item>
              <Dropdown.Item eventKey="2" href="/admin/password/change">{translate('Change password')}</Dropdown.Item>
              <Dropdown.Item eventKey="3" href="/" onClick={()=> sessionStorage.clear()}>{translate('Log out')}</Dropdown.Item>
             </Dropdown.Menu>
          </Dropdown>

            
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
