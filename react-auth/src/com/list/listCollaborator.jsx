import React, { Component } from 'react';
import collaboratorService from '../../servicees/CollaborateurServices';
import BalanceService from "../../servicees/BalanceService";
import '../css/list.css';
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"

class listCollaborator extends Component {
    constructor(props) {
        super(props)

        this.state = {
                collaborator: [],
                select:"collaborator",
                search:""
        }
        //this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.changeselectHandler=this.changeselectHandler.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.changesearche=this.changesearche.bind(this);
    }

    deleteUser(id,id1){
       
            collaboratorService.deleteUser(id).then( res => {
                this.setState({collaborator: this.state.collaborator.filter(user => user.id !== id)});
            });
            BalanceService.deleteBalance(id1);
    }
        
    
    
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
    changesearche=(event)=>{
        this.setState({search:event.target.value});
    }
    render() {
        return (
            
            <div>
                <br></br>
                <div className = "row">
                    <input type="text" placeholder="search" onChange={this.changesearche}/>
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    
                                    <th> {translate('FirstName')}</th>
                                    <th> {translate('LastName')} </th>
                                    
                                   
                                    <th>{translate('username')}</th>
                                    <th>{translate('Experience')}</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.collaborator.filter((val)=>{
                                        if(this.state.search == ""){
                                        return val
                                    }else if (val.firstname.toLowerCase().includes(this.state.search.toLowerCase())){
                                        return val
                                        }
                                        }).map(
                                        user => 
                                        <tr key = {user.id }>
                                              
                                            <td> {user.firstname}</td>
                                            <td> {user.lastname}</td>
                                                    
                                            
                                            <td> {user.username}</td>
                                            <td>{user.experience}</td>    
                                            <td>
                                            <button onClick={ () => this.editUser(user.id)} className="btn btn-info">{translate('Update')} </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id,user.solde.id)} className="btn btn-danger">{translate('Delete')} </button>
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
