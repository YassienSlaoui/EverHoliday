import React from 'react'
import './Login1.css'
import Logo from './logo.png'
export default class ForgetPassword extends React.Component{

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
                                       Please enter your email to send to you new password !!
                                    </div>
                                    <form action="">
                                        <div className="container-sm element-margin">
                                             <input type="email" name="email" className="form-control" placeholder="username@everis.nttdata.com" />
                                        </div>
                                         
                                            <div className="container-sm element-margin">
                                             <button type="submit" className="btn btn-success" name="singIn" ><a href="/">Send Request</a></button>
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