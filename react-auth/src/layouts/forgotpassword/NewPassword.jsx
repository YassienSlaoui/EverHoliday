import React from 'react'
import 'layouts/Login1.css'
import Logo from '../logo3.png'
import { withRouter } from 'react-router-dom'
import ForgotService from '../../servicees/ForgotServices';
 class NewPassword extends React.Component{
    constructor(props) {
        super(props)
  
      this.state = { 
        newpassword:'',
        retypepassword:'',
        }
        this.changenewpasswordHandler=this.changenewpasswordHandler.bind(this);
        this.changereytpepasswordHandler=this.changereytpepasswordHandler.bind(this);
        this.changereytpepasswordHandler=this.changereytpepasswordHandler.bind(this)
    }
        changenewpasswordHandler= (event) =>{
            this.setState({newpassword: event.target.value});
        }
        changereytpepasswordHandler= (event) =>{
            this.setState({retypepassword: event.target.value});
        }
        saveOrUpdatePassword = (e) => {
            e.preventDefault();
            console.log(this.state.newpassword === this.state.retypepassword )
            if(this.state.newpassword === this.state.retypepassword&& this.state.newpassword!=""){
              ForgotService.ResetPassword(sessionStorage.getItem('email'),this.state.newpassword).then(res=>{ this.props.history.push('/');sessionStorage.clear();})
            
            }else{
                alert('password no the some')
            }
        }
    render() {
        console.log(this.state.newpassword === this.state.retypepassword)
        console.log(sessionStorage.getItem('email'))
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
                                             <input type="password" name="passwordN" className="form-control" onChange={this.changenewpasswordHandler}  />
                                        </div>
                                        <label>
                                        RETYPE PASSWORD
                                        </label>
                                        <div className="container-sm element-margin">
                                             <input type="password" name="passwordNR" className="form-control" onChange={this.changereytpepasswordHandler}   />
                                        </div>
                                         
                                            <div className="container-sm element-margin">
                                             <button type="submit" className="btn btn-success" name="singIn" onClick={this.saveOrUpdatePassword} > OK </button>
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
export default withRouter(NewPassword)