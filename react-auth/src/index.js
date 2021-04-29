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
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Authentication from 'layouts/Authentication';
import Alogin from 'layouts/login';
import Login from 'layouts/Login1';
import ForgetPassword from 'layouts/ForgetPassword'
import AdminLayout from "layouts/Admin.js";
import Rh from "layouts/Rh.js";
import Collaborator from "layouts/collaborateur.js";
import axios from "axios";

const getlayout = () => {
 
    if (sessionStorage.getItem('role') === "RH" ) {

      return (
        <Route path="/RH" render={(props) => <Rh {...props} />} />
      );
    }else if(sessionStorage.getItem('role') === "collaborator") {
      return (
        <Route path="/admin" render={(props) => <Collaborator {...props} />} />
      );
    }else if(sessionStorage.getItem('role') === "collaborator") {
      return (
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      );
    }
  
};
ReactDOM.render(
  <BrowserRouter>
    <Switch>
     {/*
      {getlayout()}
      <Route path="/admin" render={(props) => <Rh {...props} />} />
      <Route path="/admin" render={(props) => <Collaborator {...props} />} />
     */} 
     <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
     <Route exact path="/"><Login/></Route>
     <Route exact path="/hy">< ForgetPassword/></Route>
      {/* <Route exact path="/"><Alogin/></Route>*/}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
