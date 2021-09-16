import React, { Component } from 'react';
import HolidayService from '../../servicees/HolidayService'
import '../css/list.css';
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import collaboratorService from '../../servicees/CollaborateurServices';
// holdays list with option give to RH option to change in the list
class Holidaylist extends Component {
    constructor(props) {
        super(props)

        this.state = {
                holidays: []
        }
        
        this.editHoliday = this.editHoliday.bind(this);
        this.checkRh=this.checkRh.bind(this)
        this.checkRhbtn=this.checkRhbtn.bind(this)
      
    }

    editHoliday(id){
        this.props.history.push(`/admin/holiday/${id}`);
    }
    
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
    checkRh(x){
        if(sessionStorage.getItem('role')==="RH"){
            return(<td>
                 <button onClick={ () => this.editHoliday(x)} className="btn btn-info">Update </button>
                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteHoliday(x)} className="btn btn-danger">Delete </button>
            
            </td>);
               
        }
    }
    checkRhbtn(){
        if(sessionStorage.getItem('role')==="RH"){
            return(
        <div className="btnholiday">
                                <button onClick={this.addHolidays.bind(this)} className="btn btn-info ">Add Holiday</button>
       </div>);
    }}
    render() {
        return (
            
            <div>
                <br></br>
                <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>   {translate('Holiday')}</th>
                                    <th>{translate('date')}</th>
                                    <th> {translate('Duration')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    this.state.holidays.filter(val=>{
                                        let re = val.country
                                        console.log(sessionStorage.getItem("country"))
                                        console.log(re)
                                        console.log(re===sessionStorage.getItem("country"))
                                        if(re===sessionStorage.getItem("country")){return val}}).map(
                                        
                                        holiday => 
                                        <tr key = {holiday.id }>
                                            <td> {holiday.name}</td>
                                            <td> {holiday.date}</td>
                                            <td> {holiday.duration}</td>
                                            {this.checkRh(holiday.id)}
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                         {this.checkRhbtn()}
                </div>
            
               
               </div>
        );
    }
}

export default Holidaylist;
