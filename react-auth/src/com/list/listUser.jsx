import React, { Component } from 'react';
import UserService from '../../servicees/UserServices'
import '../css/list.css';
class listUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
                users: []
        }
        //this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }
    
    editUser(id){
        this.props.history.push(`/admin/add-user/${id}`);
    }
    /*
    addUser(){
        this.props.history.push('/add-user/_add');
    }
       
    */
    componentDidMount(){
        UserService.getUser().then((res) => {
            this.setState({ users: res.data});
        });
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Collaborateur List</h2>
                {/* <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add Employee</button>
                     </div >*/}
                <br></br>
                <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> User Name</th>
                                    <th> age</th>
                                    <th>  team</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user => 
                                        <tr key = {user.id}>
                                            <td> { user.name} </td>   
                                            <td> {user.age}</td>
                                            <td> {user.team}</td>
                                            <td>
                                            <button onClick={ () => this.editUser(user.id)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete </button>
                                            
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                </div>
            </div>
        );
    }
}

export default listUser;
