import React, { Component } from 'react';
import collaboratorService from '../../servicees/CollaborateurServices';
import BalanceService from "../../servicees/BalanceService";
import '../css/list.css';
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import UnitService from '../../servicees/UnitService';

class listCollaborator extends Component {
    constructor(props) {
        super(props)

        this.state = {
                collaborator: [],
                select:"collaborator",
                search:"",
                teamRh:[],
                RHadmin:""
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
       
        collaboratorService.getUser().then((res) => {
            
            this.setState({ collaborator: res.data});
        });
    
    UnitService.getunit().then(res=>{
       res.data.map(res=>{
        if(res.name==="RH"){
            this.setState({teamRh:res.collaborators1,RHadmin:res.validator})
        }})
    })
}
    componentDidUpdate(pp,ps,sS){
        
            collaboratorService.getUser().then((res) => {
                this.setState({ collaborator: res.data});
            });
        
        
       
    }
    changesearche=(event)=>{
        this.setState({search:event.target.value});
    }
    render() {
    
        return (
            
            <div>
                <br></br>
                <div className = "row">
                    <input type="text" placeholder="search" onChange={this.changesearche} style={{marginLeft: "10px"}}/>
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
                                       if(parseInt(sessionStorage.getItem('user'))!=this.state.RHadmin.id){
                                           let a=false;
                                            this.state.teamRh.map(res=>{
                                                
                                            if( val.id == res.id ){
                                              a =true
                                             
                                            }
                                        }) 
                                        
                                        console.log(a==false)
                                        if(a ==false &&this.state.search == "" && val.id!=this.state.RHadmin.id&&val.team !="Directeur"){
                                                   
                                            return val
                                        }else if (a ==false &&val.firstname.toLowerCase().includes(this.state.search.toLowerCase())&&val.id!=this.state.RHadmin.id&&val.team !="Directeur"){
                                          return val
                                            }
                                        
                                        }else{
                                            if(this.state.search == ""&&val.id!=this.state.RHadmin.id&&val.team !="Directeur"){
                                                
                                                return val
                                            }else if (val.firstname.toLowerCase().includes(this.state.search.toLowerCase())&&val.id!=this.state.RHadmin.id&&val.team !="Directeur"){
                                                return val
                                                }  
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
