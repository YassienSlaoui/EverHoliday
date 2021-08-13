import React, { Component } from 'react'
import {FormattedMessage} from "react-intl";
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import collaboratorService from '../../servicees/CollaborateurServices';
class changePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
           id: parseInt(sessionStorage.getItem('user')),
           userp:"",
           password:'',
           newpassword:'',
           retypepassword:'',
           result:''

        }
        this.changenewpasswordHandler=this.changenewpasswordHandler.bind(this);
        this.changepasswordHandler=this.changepasswordHandler.bind(this);
        this.changereytpepasswordHandler=this.changereytpepasswordHandler.bind(this);
        this.saveOrUpdatePassword=this.saveOrUpdatePassword.bind(this);
      

    }

    // step 3
    changepasswordHandler= (event) =>{
        this.setState({password: event.target.value});
    }
    changenewpasswordHandler= (event) =>{
        this.setState({newpassword: event.target.value});
    }
    changereytpepasswordHandler= (event) =>{
        this.setState({retypepassword: event.target.value});
    }
    cancel(){
        this.props.history.push('/admin/calendar');
    }
    //get old password
    componentDidMount(){
        collaboratorService.getUserById(this.state.id).then( (res) =>{
            let user = res.data;
            this.setState({userp: user.password,
           });
    }); }
    
    //check password is correct and change
     saveOrUpdatePassword = (e) => {
        e.preventDefault();
        
       var bcrypt = require('bcryptjs');
       let user = {
           password:this.state.newpassword
       }
        const match =  bcrypt.compare(this.state.password, this.state.userp.slice(8))
        if(this.state.newpassword === this.state.retypepassword){
            match.then(res=> { console.log(res)
                if(res){
                    collaboratorService.password(user,this.state.id).then(ha =>{
                        alert('change success')
                    });
                }else{
                    alert('pswd not correct')
                }
            })
        }else{
            alert('password no the some')
        }
    }
    render() {
        
        return (
            
            <div>
                <br></br>
                <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <div className = "card-body">
                                    <form>
                                    
                                        <div className = "form-group">
                                            <label>{translate('Password')}: </label>
                                            <input placeholder="Password" name="Password" className="form-control" 
                                               type="password" value={this.state.password} onChange={this.changepasswordHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> {translate('New password')}: </label>
                                            <input placeholder="" name="" className="form-control" 
                                               type="password" value={this.state.newpassword} onChange={this.changenewpasswordHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> {translate('Retype password')}: </label>
                                            <input placeholder="" name="" className="form-control" 
                                               type="password" value={this.state.retypepassword} onChange={this.changereytpepasswordHandler}/>
                                        </div>
                                      
                                        <button className="btn btn-success" onClick={this.saveOrUpdatePassword}>{translate('Save')}</button>
                                        <button className="btn btn-danger"  style={{marginLeft: "10px"}}>{translate('Cancel')}</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        )
    }
}

export default changePassword 