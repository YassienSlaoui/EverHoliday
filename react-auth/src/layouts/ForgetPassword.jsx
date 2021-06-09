import React from 'react'

import Logo from './logo.png'
//import collaboratorService from '../servicees/CollaborateurServices';
//import ForgotPassService from '../servicees/ForgotPassService';
import ForgotService from '../servicees/ForgotServices';
import './Login1.css'
import { withRouter } from 'react-router-dom';



export default class ForgetPassword extends React.Component{
  constructor(props) {
      super(props)

    this.state = {
      //id: this.props.match.params.id,    
      id: "",  
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
                console.log(res.data);
                alert("email  exist");
              }else{
                console.log(res.data);
                alert("email doesn't exist");
              }
           });


  }

 /* componentDidMount(){
    this._isMounted = true;
    // step 4
    if(this.state.id === ':id'){
        return
    }else{
        collaboratorService.getUserById(this.state.id).then( (res) =>{
            let user = res.data;
          
            this.setState({
                id:user.id,

                email:user.email
            });
        });
    }
}*/


 /* 
            
        

        ForgotService.requestforgot(this.state.email).then( res => {
            sessionStorage.setItem('token',JSON.stringify(res.data.token).replace('"','hy').slice(0, -1))
            alert("Email exist ");
          },
          err=> {
            let x= document.querySelector('.hidden-error').style.display = "block";
            
            setTimeout(function(){document.querySelector('.hidden-error').style.display = "none"},1200) 
          }
          
          )
        
      
        
       if(this.state.email === ""){
            this.errors('email')
        }
      
        else{
          let user = { email:this.state.email};
        
          if (this.state.id === ":id"){
            let varificationemail = ForgotService.getUserByEmail(user.email).then(res => {
              console.log(res.data)
             if (res.data) {
            console.log(res.data)
              alert("Email "+ user.email+" exist dans db");
             }
          });
        }
      }
     
  

  
    if(this.state.email === ""){
     this.errors('email')
    }

     
    else{
    let user = {  
     email:this.state.email
    };

 
 
     if (this.state.id === ":id") {
         
         let varificationemail = ForgotService.getUserByEmail(user.email).then(res => {
              if (res.data) {
                 console.log(res.data)
                      
                alert("Email "+ user.email+"exist");
                           
                }
            });
        }
    }
 }
    */
  
  changeemailHandler = (event) =>{
      this.setState({email:event.target.value});
  }
  
  
  render() {
    console.log(this.state.email)
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
                                     Please enter your email to send to you new password !!
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