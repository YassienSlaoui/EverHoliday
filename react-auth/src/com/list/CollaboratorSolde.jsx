import React, { Component } from 'react';
import UnitService from '../../servicees/UnitService'
import '../css/list.css';
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import collaboratorService from '../../servicees/CollaborateurServices';
class CollaboratorSolde extends Component {
    constructor(props) {
        super(props)

        this.state = {
                collaborator: []
        }
        this.calculeCumulativeBalance=this.calculeCumulativeBalance.bind(this)
        
    }

    
    componentDidMount(){
        let user1 = {
            id:parseInt(sessionStorage.getItem('user'))
        };
        UnitService.collaborators(parseInt(sessionStorage.getItem('user'))).then((res) => {
            this.setState({ collaborator: res.data});
        });
    }
    calculeCumulativeBalance (soldes) {
        let a=0
        if(soldes!=[] && soldes!=null){
           
          soldes.map(solde=> a=a+solde.balance)
        }
        return a
      }
    render() {
        console.log(this.state.collaborator)
        return (
            <div>
                <br></br>
                <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>  {translate('collaborator')}</th>
                                    <th>{translate('Total balance')}</th>
                                    <th>{translate('Cumulative Balance')} </th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    this.state.collaborator.map(
                                        
                                        collaborators => 
                                        <tr key = {collaborators.id }>
                                            <td> {collaborators.firstname + " "+ collaborators.lastname}</td>
                                            <td> {collaborators.solde.annualBalance+this.calculeCumulativeBalance(collaborators.solde.cumulativeBances)}</td>
                                            <td> {this.calculeCumulativeBalance(collaborators.solde.cumulativeBances)}</td>
                                            
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
