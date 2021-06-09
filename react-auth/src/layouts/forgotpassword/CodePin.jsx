import React from 'react'
import 'layouts/Login1.css'
import Logo from '../logo.png'
export default class CodePin extends React.Component{

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
                                    Enter the code that was sent to your email
                                    </div>
                                    <form action="">
                                        <div className="container-sm element-margin">
                                             <input type="code" name="code" className="form-control"  />
                                        </div>
                                         
                                            <div className="container-sm element-margin">
                                             <button type="submit" className="btn btn-success" name="code" ><a href="newpassword"> OK </a></button>
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