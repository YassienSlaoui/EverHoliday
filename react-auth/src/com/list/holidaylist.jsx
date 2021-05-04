import React, { Component } from 'react';
import HolidayService from '../../servicees/HolidayService'
import '../css/list.css';
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import collaboratorService from '../../servicees/CollaborateurServices';
class Holidaylist extends Component {
    constructor(props) {
        super(props)

        this.state = {
                holidays: []
        }
        //this.addUser = this.addUser.bind(this);
        this.editHoliday = this.editHoliday.bind(this);
        
      //  this.deleteUser = this.deleteUser.bind(this);
    }
/*
    deleteUser(id){
        collaboratorService.deleteUser(id).then( res => {
            this.setState({collaborator: this.state.collaborator.filter(user => user.id !== id)});
        });
    }
    */
    editHoliday(id){
        this.props.history.push(`/admin/holiday/${id}`);
    }
    /*
    addUser(){
        this.props.history.push('/add-user/_add');
    }
       
    */
   addHolidays(){
    this.props.history.push('/admin/holiday/add');
   }
   deleteHoliday(id){
       HolidayService.deleteHoliday(id).then( res => {
        this.setState({holidays: this.state.holidays.filter(holiday => holiday.id !== id)});
    });
   }
    componentDidMount(){
        HolidayService.getHoliday().then((res) => {
            this.setState({ holidays: res.data});
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
                                    <th>   {translate('Holiday')}</th>
                                    <th>{translate('Date')}</th>
                                    <th> {translate('Duration')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    this.state.holidays.map(
                                        
                                        holiday => 
                                        <tr key = {holiday.id }>
                                            <td> {holiday.name}</td>
                                            <td> {holiday.date}</td>
                                            <td> {holiday.duration}</td>
                                            <td>
                                            <button onClick={ () => this.editHoliday(holiday.id)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteHoliday(holiday.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="btnholiday">
                                <button onClick={this.addHolidays.bind(this)} className="btn btn-info ">Add Holiday</button>
                        </div>
                </div>
            
               
               </div>
        );
    }
}

export default Holidaylist;
