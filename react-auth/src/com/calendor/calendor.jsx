import React, { Component } from 'react'
import '../css/calendor.css'
import { CalendarComponent, RenderDayCellEventArgs  } from '@syncfusion/ej2-react-calendars';
class calendor extends Component {

    
     dateValue= new Date(new Date().getFullYear(), new Date().getMonth(), 12);
     dateValue1= new Date(new Date().getFullYear(), new Date().getMonth(), 22);
     dateValue2= new Date(new Date().getFullYear(), new Date().getMonth(), 17);

     minDate= new Date(new Date().getFullYear(), new Date().getMonth(), 6);
     maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 25);
     

     render() {

    return (
      <CalendarComponent   value={this.dateValue} min={this.minDate} max={this.maxDate}
      isMultiSelection={true}></CalendarComponent>
    );
     }
    }
  export default calendor;
