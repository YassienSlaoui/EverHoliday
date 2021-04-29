import React, { Component } from 'react'

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
        this.check=this.check.bind(this)

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
    componentDidMount(){
        collaboratorService.getUserById(this.state.id).then( (res) =>{
            let user = res.data;
            this.setState({userp: user.password,
           });
    }); }
    async check(){
        var bcrypt = require('bcryptjs');
        const match = await bcrypt.compare(this.state.password, this.state.userp.slice(8))
        if(match){
            console.log('yes')
        }else{
            console.log('no')
        }   
    }
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
        console.log(this.state.newpassword)
        return (
            
            <div>
                <br></br>
                <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <div className = "card-body">
                                    <form>
                                    
                                        <div className = "form-group">
                                            <label>Password: </label>
                                            <input placeholder="Password" name="Password" className="form-control" 
                                               type="password" value={this.state.password} onChange={this.changepasswordHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> New password: </label>
                                            <input placeholder="" name="" className="form-control" 
                                               type="password" value={this.state.newpassword} onChange={this.changenewpasswordHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Retype password: </label>
                                            <input placeholder="" name="" className="form-control" 
                                               type="password" value={this.state.retypepassword} onChange={this.changereytpepasswordHandler}/>
                                        </div>
                                      
                                        <button className="btn btn-success" onClick={this.saveOrUpdatePassword}>Save</button>
                                        <button className="btn btn-danger"  style={{marginLeft: "10px"}}>Cancel</button>
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