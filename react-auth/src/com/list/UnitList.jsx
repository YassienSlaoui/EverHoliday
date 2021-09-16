import React, { Component } from 'react';
import UnitService from '../../servicees/UnitService'
import '../css/list.css';
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
class UnitList extends Component {
    constructor(props) {
        super(props)

        this.state = {
                units: []
        }
        
        this.editHoliday = this.editHoliday.bind(this);
        
     this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id){
        UnitService.deletenit(id).then( res => {
            this.setState({units: this.state.units.filter(units => units.id !== id)});
        });
    }
    
    editHoliday(id){
        this.props.history.push(`/admin/unit/${id}`);
    }
   
   addHolidays(){
    this.props.history.push('/admin/unit/add');
   }
    componentDidMount(){
        UnitService.getunit().then((res) => {
            this.setState({ units: res.data});
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
                                    <th> {translate('Name')} </th>
                                    <th>{translate('Validator')}</th>
                                    <th> {translate('Team')}</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    this.state.units.filter(val=>{if(val.country===sessionStorage.getItem('country')){return val}}).map(
                                        
                                        unit => 
                                        <tr key = {unit.id }>
                                            <td> {unit.name}</td>
                                            <td>{unit.validator.firstname +" "+ unit.validator.lastname}</td>
                                            <td>{unit.collaborators.map(user => <p key = {user}>{user}</p>)} </td> 
                                             
                                         <td>
                                            <button onClick={ () => this.editHoliday(unit.id)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(unit.id)} className="btn btn-danger">Delete </button>                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="btnholiday">
                                <button onClick={this.addHolidays.bind(this)} className="btn btn-info ">{translate('Add Unit')}</button>
                        </div>
                </div>
            
               
               </div>
        );
    }
}

export default UnitList;
