import React, {useState, Component } from 'react'
import {Datepicker, START_DATE} from '@datepicker-react/styled'
import HolidayService from '../../servicees/HolidayService'
import dateFormat from "dateformat";
import moment from 'moment';
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
      
      this.state.holidays.map(map=>{
        for(var i =0;i<=map.duration;i++){
          var a =new Date(map.date)
          var c = dateFormat(new Date(a.getTime()+(1000 * 3600 * 24)*i),"yyyy-mm-dd")
          if (date.getDay()==6|| date.getDay()==0||dateFormat(date, "yyyy-mm-dd")==c){
          show =true
         
        }
        }
        
      })
          
          return show
        }
    
    
    render() {
     
      const stateDefinitions = {
        available: {
          color: null,
          label: 'Available',
        },
        enquire: {
          color: '#ffd200',
          label: 'Enquire',
        },
        unavailable: {
          selectable: false,
          color: '#78818b',
          label: 'Unavailable',
        },
      };
      /*
      var momentRange = require('moment-range');
      momentRange.extendMoment(moment);
      const dateRanges = [
        {
          state: 'enquire',
          range: momentRange.range(
            moment().add(2, 'weeks').subtract(5, 'days'),
            moment().add(2, 'weeks').add(6, 'days')
          ),
        },
        {
          state: 'unavailable',
          range: momentRange.range(
            moment().add(3, 'weeks'),
            moment().add(3, 'weeks').add(5, 'days')
          ),
        },
      ];*/
        return (
            <Datepicker
                onDatesChange={this.handleDatesChange}
                onChange={this.handleChange}
                startDate={this.state.startDate} // Date or null
                endDate={this.state.endDate} // Date or null
                focusedInput={this.state.focusedInput} // START_DATE, END_DATE or null
                isDateBlocked={this.blockedDate}
                stateDefinitions={stateDefinitions}
                //dateStates={dateRanges}
                
             />
        )
    }
}
export default calendar;