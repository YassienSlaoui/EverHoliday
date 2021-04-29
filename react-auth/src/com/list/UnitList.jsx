import React, { Component } from 'react';
import UnitService from '../../servicees/UnitService'
import '../css/list.css';
class UnitList extends Component {
    constructor(props) {
        super(props)

        this.state = {
                units: []
        }
        //this.addUser = this.addUser.bind(this);
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
    /*
    addUser(){
        this.props.history.push('/add-user/_add');
    }
       
    */
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
                                    <th>  Name</th>
                                    <th>Validator</th>
                                    <th> Team</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    this.state.units.map(
                                        
                                        unit => 
                                        <tr key = {unit.id }>
                                            <td> {unit.name}</td>
                                            <td> {unit.validator.firstname +" "+ unit.validator.lastname}</td>
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
                                <button onClick={this.addHolidays.bind(this)} className="btn btn-info ">Add Unit</button>
                        </div>
                </div>
            
               
               </div>
        );
    }
}

export default UnitList;
