
import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import Addholiday from "com/add/addHoliday"
import sidebarImage from "assets/img/sidebar-3.jpg";
function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if(sessionStorage.getItem('role')==="RH"){
        if (prop.layout === "/admin" || prop.layout === "/admin/holiday" || prop.layout === "/admin/list" || prop.layout === "/admin/unit" || prop.layout === "/admin/password"|| prop.layout === "/admin/units"||prop.layout==="/admin/vacationrequest"||prop.layout==="/admin/validator" ) {

          return (
            <Route
              path={prop.layout + prop.path}
              render={(props) => <prop.component {...props} />}
              key={key}
            />
          );
        }else{
          return null;
        }
        } else if (sessionStorage.getItem('role') ==="Collaborator"){
          if (prop.layout === "/admin" || prop.layout === "/admin/holiday" || prop.layout === "/admin/password" ||prop.layout==="/admin/vacationrequest" ) {

            return (
              <Route
                path={prop.layout + prop.path}
                render={(props) => <prop.component {...props} />}
                key={key}
              />
            );
        }
      } else if (sessionStorage.getItem('role') ==="validator"){
        if (prop.layout === "/admin" || prop.layout === "/admin/holiday" || prop.layout === "/admin/list" || prop.layout === "/admin/unit" || prop.layout === "/admin/password" || prop.layout === "/admin/validator" ||prop.layout==="/admin/vacationrequest") {

          return (
            <Route
              path={prop.layout + prop.path}
              render={(props) => <prop.component {...props} />}
              key={key}
            />
          );
        }else{
          return null;
        }
      }
      
    });
  };
  (function()
{
  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else
      localStorage.removeItem('firstLoad');
  }
})();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  const getSidebar = () =>  {
    
    if(sessionStorage.getItem('role')==="RH"){
      return ( <Sidebar color={color} image={hasImage ? image : ""} routes={routes} path = "/admin" path2 = "/admin/list" path3="/admin/units" path4 = "/admin/validator" /> );
    }else if(sessionStorage.getItem('role')==="Collaborator"){
      return (<Sidebar color={color} image={hasImage ? image : ""} routes={routes} path = "/admin"   />);
    }else  if(sessionStorage.getItem('role')==="validator"){
      return (<Sidebar color={color} image={hasImage ? image : ""} routes={routes} path = "/admin" path2 = "/admin/validator"  />);
    }else{
      <Sidebar color={color} image={hasImage ? image : ""} routes={routes} path = "/admin" path2 = "/admin/list"  />
    }
   
  }
  return (
    <>
      <div className="wrapper">
        
        {getSidebar()}
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}
            <Route path="/holiday/add">
            <Addholiday/>
            </Route>
            </Switch>
          </div>
          
        </div>
      </div>
      
    </>
  );
}

export default Admin;
