import React from 'react'

import Logo from './logo3.png'
//import collaboratorService from '../servicees/CollaborateurServices';
//import ForgotPassService from '../servicees/ForgotPassService';
import ForgotService from '../servicees/ForgotServices';
import './Login1.css'
import { withRouter } from 'react-router-dom';



 class ForgetPassword extends React.Component{
  constructor(props) {
      super(props)

    this.state = { 
          email:""
         
          
          
      }
      //this.changeemailHandler=this.changeemailHandler.bind(this);
      
      //this.forgot = this.forgot.bind(this);
      
      this.changeemailHandler=this.changeemailHandler.bind(this);
      
      
      this.SubmitForgot = this.SubmitForgot.bind(this);

  }

  SubmitForgot = (e) => {
    this._isMounted = true;
           e.preventDefault();
           
           const pass=ForgotService.requestforgot(this.state.email).then((res) =>{
             console.log(res.data)
            if(res.data)
              {
                sessionStorage.setItem('email',this.state.email)
                console.log(res.data);
                this.props.history.push('/codepin');
                
              }else{
               alert("error, email n'existe pas")
            
              }
           });


  }

 
  
  changeemailHandler = (event) =>{
      this.setState({email:event.target.value});
  }
  
  
  render() {
      return (
          <div className="body">
                 <div className="propre-container ">


              <div className="container   mx-auto">
                  <div className="">
                  <div className="card  ">
                      <div className="card-header ">
                          <img src={Logo} alt="Logo" />
                      </div>
                      <div className="card-body">
                              <div className="form-group">
                          <div className="app-name">
                                          <h4>EverHoliday</h4>
                          </div>
                                  <div className="hidden-error ">
                                     Please enter your email !!
                                  </div>
                                  <form action="">
                                      <div className="container-sm element-margin">
                                           <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.changeemailHandler} placeholder="username@everis.nttdata.com" />
                                           <div className="hidden-error text-danger email" style={{display:"none"}}>
                                                  Enter the email.
                                              </div>
                                      </div> 
                                       
                                          <div className="container-sm element-margin">
                                           <button type="submit" className="btn btn-success" name="submit"  onClick={this.SubmitForgot} >Send Request</button>
                                  </div>
                             
                              
 
                            </form>
                          </div>
                       
                          
                      </div>
                      
                      </div>
                      </div>
              </div>

          </div>
          </div>
         
      );
}





}
export default withRouter(ForgetPassword)