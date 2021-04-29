import React, { Component } from 'react'
import UserService from '../../servicees/UserServices'

class AddUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            age: '',
            team: ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changeageHandler = this.changeageHandler.bind(this);
        this.changeteamHandler = this.changeteamHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === ':id'){
            return
        }else{
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({name: user.name,
                    age: user.age,
                    team : user.team
                });
            });
        }
    }
    saveOrUpdateUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, age: this.state.age, team: this.state.team};

        // step 5
        if(this.state.id === ":id"){
            UserService.createUser(user).then(res =>{
                this.props.history.push('/admin/users');
            });
        }else{
            UserService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/admin/users');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeageHandler= (event) => {
        this.setState({age: event.target.value});
    }

    changeteamHandler= (event) => {
        this.setState({team: event.target.value});
    }

    cancel(){
        this.props.history.push('/admin/users');
    }

    getTitle(){
        if(this.state.id === ":id"){
            return <h3 className="text-center">Add Collaborator</h3>
        }else{
            return <h3 className="text-center">Update Collaborator</h3>
        }
    }
    render() {
        return (
            
            <div>
                <br></br>
                <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>Name: </label>
                                            <input placeholder="name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changenameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> age </label>
                                            <input placeholder="age" name="age" className="form-control" 
                                                value={this.state.age} onChange={this.changeageHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> team </label>
                                            <input placeholder="team" name="team" className="form-control" 
                                                value={this.state.team} onChange={this.changeteamHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        )
    }
}

export default AddUser 