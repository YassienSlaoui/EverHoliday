import React from 'react'
import 'layouts/Login1.css'
import Logo from '../logo.png'
export default class NewPassword extends React.Component{

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
                                    
                                    <form action="">
                                        <label>
                                        NEW PASSWORD
                                        </label>
                                        <div className="container-sm element-margin">
                                             <input type="password" name="passwordN" className="form-control"  />
                                        </div>
                                        <label>
                                        RETYPE PASSWORD
                                        </label>
                                        <div className="container-sm element-margin">
                                             <input type="password" name="passwordNR" className="form-control"  />
                                        </div>
                                         
                                            <div className="container-sm element-margin">
                                             <button type="submit" className="btn btn-success" name="singIn" ><a href="/"> OK </a></button>
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