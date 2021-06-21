
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import PaidRequestService from '../../servicees/PaidRequestService'
import ExeptionnelRequestService from '../../servicees/ExptionnelService'
import UnPaidRequestService from '../../servicees/UnPaidRequestService';
import RecoveryRequestService from '../../servicees/RecoveryRequestService';
import UnitService from "../../servicees/UnitService"
import translate from "../../i18nProvider/translate"
import '../css/list.css';
class Historic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            trainings:[],
            paidRequest: [],
            unPaidRequest:[],
            exptionnel:[],
            RecoveryRequest: [],
            select:"paidrequest",
            collaborator:[]
        }
        this.eventStyleGetter =this.eventStyleGetter.bind(this)
    }

    componentDidMount(){
      PaidRequestService.getPaidRequest().then(res=>{
        this.setState({paidRequest:res.data});
      })
      UnPaidRequestService.getUnPaidRequest().then(res=>{
        this.setState({unPaidRequest:res.data});
      })
      ExeptionnelRequestService.geExeptionnelRequest().then(res=>{
        this.setState({exptionnel:res.data});
      })
      RecoveryRequestService.getRecoveryRequest().then(res=>{
        this.setState({RecoveryRequest:res.data});
      })
      UnitService.team(parseInt(sessionStorage.getItem('user'))).then((res) => {
        this.setState({ collaborator: res.data});
    });
    }
    eventStyleGetter=(event, start, end, isSelected) =>{
      if(event.type=="paid"){
        var backgroundColor = '#3174ad' ;
      }else if(event.type=="Unpaid"){
        var backgroundColor = '#4aad31' ;
      }else if(event.type=="exptionnel"){
        var backgroundColor = '#7f2e16' ;
      }else if(event.type=="recovery"){
        var backgroundColor = '#c526b2' ;
      }
     
      var style = {
          backgroundColor: backgroundColor
      };
      return {
          style: style
      };
  }
    render() {
      const localizer = momentLocalizer(moment)
    const event1= this.state.paidRequest.filter(val =>{
      for (const element of this.state.collaborator) {
        if(val.statut==="accepted" && element.id===val.collaborator.id )
      {return val}}     
    }).map((paidRequest)=>{
      return {
        id: paidRequest.id,
        title: paidRequest.collaborator.firstname+" "+paidRequest.collaborator.lastname,
        start: new Date(paidRequest.datesRequest[0].startDate),
        end: new Date(paidRequest.datesRequest[0].endDate),
        allDay: true,
        type:"paid"
      }
    })
    const event2= this.state.unPaidRequest.filter(val =>{for (const element of this.state.collaborator) {
      if(val.statut==="accepted" && element.id===val.collaborator.id )
    {return val}}}).map((paidRequest)=>{
      return {
        id: paidRequest.id,
        title: paidRequest.collaborator.firstname+" "+paidRequest.collaborator.lastname,
        start: new Date(paidRequest.datesRequest[0].startDate),
        end: new Date(paidRequest.datesRequest[0].endDate),
        allDay: true,
        type:"Unpaid"
      }
    })
    const event3= this.state.exptionnel.filter(val =>{for (const element of this.state.collaborator) {
      if(val.statut==="accepted" && element.id===val.collaborator.id )
    {return val}}}).map((paidRequest)=>{
      return {
        id: paidRequest.id,
        title: paidRequest.collaborator.firstname+" "+paidRequest.collaborator.lastname,
        start: new Date(paidRequest.datesRequest[0].startDate),
        end: new Date(paidRequest.datesRequest[0].endDate),
        allDay: true,
        type:"exptionnel"
      }
    })
    const event4= this.state.RecoveryRequest.filter(val =>{for (const element of this.state.collaborator) {
      if(val.statut==="accepted" && element.id===val.collaborator.id )
    {return val}}}).map((paidRequest)=>{
      
      return {
        id: paidRequest.id,
        title: paidRequest.collaborator.firstname+" "+paidRequest.collaborator.lastname,
        start: new Date(new Date(paidRequest.datesRequest[0].startDate).getTime()+ ((paidRequest.startHour-1)*60*60*1000)),
        end: new Date(new Date(paidRequest.datesRequest[0].endDate).getTime()+ ((paidRequest.endHour-1)*60*60*1000)),
        allDay: false,
        type:"recovery"
      }
    })
   
    const events = event1.concat(event2,event3,event4)
    const formats = {
      eventTimeRangeFormat: range =>
        `${format(range.start, 'HH:mm')} – ${format(range.end, 'HH:mm')}`,
    };
    return (
        <Calendar 
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        views={['month', 'day', 'week']}
        style={{height: 450}}
        eventPropGetter={this.eventStyleGetter}
        
        />
        )}
}
export default Historic;