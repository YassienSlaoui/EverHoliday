import React, { Component } from 'react';
import UnitService from '../../servicees/UnitService'
import '../css/list.css';
class CollaboratorSolde extends Component {
    constructor(props) {
        super(props)

        this.state = {
                collaborator: []
        }
        
    }

    
    componentDidMount(){
        let user1 = {
            id:parseInt(sessionStorage.getItem('user'))
        };
        UnitService.collaborators(parseInt(sessionStorage.getItem('user'))).then((res) => {
            this.setState({ collaborator: res.data});
        });
    }
    render() {
        return (
            <div>
                <br></br>
                <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>  Collaborator</th>
                                    <th>Total balance</th>
                                    <th> cumulativeBalance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    this.state.collaborator.map(
                                        
                                        collaborators => 
                                        <tr key = {collaborators.id }>
                                            <td> {collaborators.firstname + " "+ collaborators.lastname}</td>
                                            <td> {collaborators.solde.cumulativeBalance+collaborators.solde.annualBalance}</td>
                                            <td> {collaborators.solde.cumulativeBalance}</td>
                                            
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

export default CollaboratorSolde;
