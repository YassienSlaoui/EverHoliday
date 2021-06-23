import React from 'react'
import 'layouts/Login1.css'
import Logo from '../logo3.png'
import ForgotService from '../../servicees/ForgotServices';
import { withRouter } from 'react-router-dom';
 class CodePin extends React.Component{
    constructor(props) {
        super(props)
  
      this.state = { 
            code:"",
            email:sessionStorage.getItem('email')
           
            
            
        }
        
        
        this.changeemailHandler=this.changeemailHandler.bind(this);
        this.changecodeHandler=this.changecodeHandler.bind(this);
        
        this.SubmitCode = this.SubmitCode.bind(this);
  
    }
    SubmitCode=(e)=>{
        this._isMounted = true;
        e.preventDefault();
        
        const pass=ForgotService.codeVerification(this.state.email,this.state.code).then((res) =>{
          console.log(res.data)
         if(res.data)
           {
             //console.log(res.data);
             this.props.history.push('/newpassword');
             
           }else{
            alert('error')
         
           }
        });
    }
    changecodeHandler = (event) =>{
        this.setState({code:event.target.value});
    }

    changeemailHandler = (event) =>{
        this.setState({email:event.target.value});
    }
    render() {
        console.log(this.state.code)
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
                                             <input type="code" name="code" className="form-control"  onChange={this.changecodeHandler} />
                                        </div>
                                         
                                            <div className="container-sm element-margin">
                                             <button type="submit" className="btn btn-success" name="code" onClick={this.SubmitCode} > OK </button>
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
export default withRouter(CodePin) 