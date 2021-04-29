import React, { Component } from 'react';
import collaboratorService from '../../servicees/CollaborateurServices';
import SupervisorService from "../../servicees/supervisorServices";
import '../css/list.css';
class listCollaborator extends Component {
    constructor(props) {
        super(props)

        this.state = {
                collaborator: [],
                select:"collaborator"
        }
        //this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.changeselectHandler=this.changeselectHandler.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id){
        if(this.state.select === "collaborator"){
            collaboratorService.deleteUser(id).then( res => {
                this.setState({collaborator: this.state.collaborator.filter(user => user.id !== id)});
            });
    }
    else if(this.state.select ==="supervisor"){
        
        SupervisorService.deleteUser(id).then( res => {
            this.setState({collaborator: this.state.collaborator.filter(user => user.id !== id)});
        });
    }}
        
    
    
    editUser(id){
        this.props.history.push(`/admin/list/add-user/${id}`);
    }
    changeselectHandler= (event) => {
        this.setState({select: event.target.value});
    }
    /*
    addUser(){
        this.props.history.push('/add-user/_add');
    }
       
    */
    componentDidMount(){
        if(this.state.select === "collaborator"){
        collaboratorService.getUser().then((res) => {
            this.setState({ collaborator: res.data});
        });
    }
    else if(this.state.select ==="supervisor"){
        
            SupervisorService.getUser().then((res) => {
                this.setState({ collaborator: res.data});
            });
    }}
    componentDidUpdate(pp,ps,sS){
        if(ps.select === "collaborator"){
            collaboratorService.getUser().then((res) => {
                this.setState({ collaborator: res.data});
            });
        }
        else if(ps.select ==="supervisor"){
            
                SupervisorService.getUser().then((res) => {
                    this.setState({ collaborator: res.data});
                });
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> CIN</th>
                                    <th> FirstName</th>
                                    <th>  LastName</th>
                                    <th> Team</th>
                                   
                                    <th>Username</th>
                                    <th>Experience</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.collaborator.map(
                                        user => 
                                        <tr key = {user.id }>
                                            <td>  {user.cin} </td>   
                                            <td> {user.firstname}</td>
                                            <td> {user.lastname}</td>
                                            <td> {user.team}</td>         
                                            
                                            <td> {user.username}</td>
                                            <td>{user.experience}</td>    
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

export default listCollaborator;
