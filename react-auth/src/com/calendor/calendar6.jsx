import React, {useState, Component } from 'react'
import {Datepicker, START_DATE} from '@datepicker-react/styled'
import HolidayService from '../../servicees/HolidayService'
import dateFormat from "dateformat";
class calendar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            startDate: null,
            endDate: null,
            focusedInput: START_DATE,
            holidays:[]
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleDatesChange=this.handleDatesChange.bind(this)
        this.blockedDate=this.blockedDate.bind(this)
       
    }

     handleDatesChange(data) {
        if (!data.focusedInput) {
            this.setState({...data, focusedInput: START_DATE})
        } else {
          this.setState(data)
        }
      }
      componentDidMount(){
          HolidayService.getHoliday().then(res => {
            this.setState({ holidays: res.data});
        
    });
      }
      
      
       handleChange(value, e) {
        console.log(value +"hi"); // this will be a moment date object
        console.log(e.target.value); // this will be a string value in datepicker input field
      }
       blockedDate (date){
        var show = false;
      
      
        
        if (date.getDay()==6|| date.getDay()==0){
          show =true
         
        }
      
          
          return show
        }
    
    
    render() {
     
      
        return (
            <Datepicker
                onDatesChange={this.handleDatesChange}
                onChange={this.handleChange}
                startDate={this.state.startDate} // Date or null
                endDate={this.state.endDate} // Date or null
                focusedInput={this.state.focusedInput} // START_DATE, END_DATE or null
                
             />
        )
    }
}
export default calendar;