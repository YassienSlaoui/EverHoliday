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
import { I18nPropvider, LOCALES } from '../src/i18nProvider';

const getlangue = () =>{
  if (sessionStorage.getItem('lang')==="En"){
    return LOCALES.ENGLISH
  }else if (sessionStorage.getItem('lang')==="Fr"){
    return LOCALES.FRENCH
  }else if (sessionStorage.getItem('lang')==="Sp"){
    return LOCALES.spanish
  }else{
    return LOCALES.ENGLISH
  }
}
ReactDOM.render(
  <I18nPropvider locale={getlangue()}>
  <BrowserRouter>
    <Switch>
    
     <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
     <Route exact path="/"><Login/></Route>
     <Route exact path="/hy">< ForgetPassword/></Route>
     
    </Switch>
  </BrowserRouter>
  </I18nPropvider>
  ,
  document.getElementById("root")
);
