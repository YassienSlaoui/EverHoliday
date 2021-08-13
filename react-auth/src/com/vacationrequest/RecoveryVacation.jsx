import React, { Component } from 'react'
import '../css/Request.css';
import collaboratorService from '../../servicees/CollaborateurServices';
import RecoveryRequestService from '../../servicees/RecoveryRequestService';
import Calendar from '../calendor/calendar5';
import dateFormat from "dateformat";
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl';
import translate from "../../i18nProvider/translate"
import Select from 'react-select';

import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
class RecoveryVacation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: [],
            calendarState:"",
            calendar:{},
            startDate:"",
            cumulative:"",
            annual:"",
            list:[],
            list1:[],
            balanceNedded:"",
            remainder:"",
            user:"",
            description:"",
            soldes:"",
            selectedType:"FullDay",
            RecoveryRequest:[],
            startHour:"",
            endHour:""
        }
        this.calendarChange=this.calendarChange.bind(this)
        this.childRef= React.createRef();
        this.dates=this.dates.bind(this);
        this.deletelist=this.deletelist.bind(this);
        this.saveRequest=this.saveRequest.bind(this)
        this.descrptionChange=this.descrptionChange.bind(this);
        this.changeSelect=this.changeSelect.bind(this);
        this.calculeBalance=this.calculeBalance.bind(this)
        this.changeStartHourHandler=this.changeStartHourHandler.bind(this);
        this.changeEndHoursHandler=this.changeEndHoursHandler.bind(this);
        this.hourselect=this.hourselect.bind(this)
    }

      // Add day with his start and end date with his duration
      add(){
      const element = this.childRef.current;
      if(this.state.list=[]){
      if(element.state.startDate!=null ){
        if(element.state.endDate!=null){
    this.setState(state1 =>{return{calendar: element.state,startDate:element.state.startDate}})
    let DateReq={
      startDate:dateFormat(element.state.startDate, "yyyy-mm-dd"),
      endDate:dateFormat(element.state.endDate, "yyyy-mm-dd"),
      duration:Math.ceil((element.state.endDate.getTime()-element.state.startDate.getTime())/(1000 * 3600 * 24)+1)
    }
    this.state.list.push([element.state.startDate,element.state.endDate,Math.ceil((element.state.endDate.getTime()-element.state.startDate.getTime())/(1000 * 3600 * 24)+1)])
    this.state.list1.push(DateReq)
    this.setState({list:this.state.list,list1:this.state.list1})
  }else{
    alert("entre EndDate")
  }
    }else{
      alert("entre startDate")
    }}else{
      alert("you can't add other one")
    }
    
}
calendarChange = (calendarState) => {
  this.setState(state => ({
    calendarState: { ...state.calendarState, ...calendarState }
  }));
 
}   
 // delete date 

deletelist(i){
      
  this.state.list.splice(i,1)
  this.state.list1.splice(i,1)
  this.setState({list:this.state.list,list1:this.state.list1})
}   
    // Table of date

dates(){
  if(this.state.list!=[]){
    
    return (
      <table className = "table table-striped table-bordered" style={{padding:"0px",margin:"0px"}}>
                        <thead>
                            <tr>
                                <th>  {translate('Start Date')}</th>
                                <th>{translate('End Date')}</th>
                                <th>{translate('Duration')} </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                this.state.list.map(
                                    
                                    (lists,index) => 
                                   
                                    <tr key = {index} >
                                        <td> {dateFormat(lists[0], "yyyy-mm-dd")}</td>
                                        <td> {dateFormat(lists[1], "yyyy-mm-dd")}</td>
                                        <td> {lists[2]}</td>
                                        <td><button onClick={(e)=> {e.preventDefault(); this.deletelist(index)}} className="btn btn-danger"> X </button></td>
                                        
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
    );
  
}
}
    // function to calcule balance use in vancaton

calculeBalance(){
  let a = 0 ;
  if(this.state.list!=[]){
    if(this.state.selectedType==="Full Day"){
  this.state.list.map(lists=>
    a=a+lists[2]
    
    )
  }else{
    this.state.list.map(lists=>
      a=a+lists[2]*0.5
      
      )
  }
  }
    return a
}
saveRequest= (e) =>{
  e.preventDefault();
  if(this.state.list1.length!=0){
  let Request = {
     collaborator : this.state.user,
     description : this.state.description,
     totalDays :this.calculeBalance(),
     datesRequest:this.state.list1,
     requestDate:dateFormat((new Date()), "yyyy-mm-dd"),
     statut: "Pending",
     typeOfTime:this.state.selectedType,
     startHour:this.state.startHour,
     endHour:this.state.endHour
  }
  RecoveryRequestService.createRecoveryRequest(Request).then(res=>{
      this.props.history.push('/admin/Home');
    })
  }else{
    alert('not')
  }
}
descrptionChange = (event) =>{
  this.setState({description: event.target.value})
}
changeSelect= (event) =>{
  this.setState({selectedType: event.target.value})
} 
changeStartHourHandler= (start) => {
  this.setState({startHour:start.value});
}   
changeEndHoursHandler= (end) => {
  this.setState({endHour:end.value});
}  
componentDidMount(){
  collaboratorService.getUserById(sessionStorage.getItem("user")).then( (res) =>{
    
    let user = res.data;
    this.setState({
      
      user:user,
       
    })
   
});

}
hourselect(){
  const options = [
    {value:1, label:"1 am"},
    {value:2, label:"2 am"},
    {value:3, label:"3 am"},
    {value:4, label:"4 am"},
    {value:5, label:"5 am"},
    {value:6, label:"6 am"},
    {value:7, label:"7 am"},
    {value:8, label:"8 am"},
    {value:9, label:"9 am"},
    {value:10, label:"10 am"},
    {value:11, label:"11 am"},
    {value:12, label:"12 am"},
    {value:13, label:"1 pm"},
    {value:14, label:"2 pm"},
    {value:15, label:"3 pm"},
    {value:16, label:"4 pm"},
    {value:17, label:"5 pm"},
    {value:18, label:"6 pm"},
    {value:19, label:"7 pm"},
    {value:20, label:"8 pm"},
    {value:21, label:"9 pm"},
    {value:22, label:"10 pm"},
    {value:23, label:"11 pm"},
    {value:24, label:"12 pm"},
]
  if(this.state.selectedType==="Hour")
  return(
    <div>
    <Form.Group style={{display:"inline-block",paddingTop: "10px",width:'20%',paddingRight:'10px'}}>
    <Select 
    onChange={change=>this.changeStartHourHandler(change)}
     options={options}
      />
       
    </Form.Group>
    <Form.Group style={{display:"inline-block",paddingTop: "10px" ,width:'20%',paddingRight:'10px'}}>
    <Select 
    onChange={change=>this.changeEndHoursHandler(change)}
     options={options}
      />
       
    </Form.Group></div>
  )
}
    
    render() {
      console.log(this.state.startHour)
      console.log(this.state.endHour)

        return (
          
          <Container fluid>
          <Row>
            <Col lg="12" xl="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">{translate('Recovery vacation')}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-4" md="12">
                        <Form.Group style={{display:"inline-block",paddingTop: "10px",paddingRight:'10px'}}>
                           <select className="custom-select" onChange={this.changeSelect} style={{width:"200px"}}>
                                            <FormattedMessage id='Full Day' key={'op' + '-' + 'b'}>
                                              {(message) => <option defaultValue value="Full Day">{message}</option>}
                                            </FormattedMessage>
                                            <FormattedMessage id='Half Day morning' key={'op' + '-' + 'a'}>
                                              {(message) => <option value="Half Day morning">{message}</option>}
                                            </FormattedMessage>
                                            <FormattedMessage id='Half Day afternoon' key={'op' + '-' + 'a'}>
                                              {(message) => <option value="Half Day afternoon">{message}</option>}
                                            </FormattedMessage>
                                            <FormattedMessage id='Hour' key={'op' + '-' + 'c'}>
                                              {(message) => <option value="Hour">{message}</option>}
                                            </FormattedMessage>
                                          
                           </select>
                           
                        </Form.Group>
                        {this.hourselect()}
                                        
                        <Button className="btn btn-success" onClick={this.add.bind(this)} style={{marginLeft: "10px",float:"right"}}> {translate('Add')}</Button>
                      </Col>
                      <Col>
                      {this.dates()}
                      
                      </Col>
                    
                      <Col md="12">                                
                                        <label style={{color:"#1DC7EA", marginLeft: "10px",display:"block"}} htmlFor="startDate">{translate('Total balance')}: {this.calculeBalance()}</label>
                                        </Col>
                                        <br></br>

                    </Row>
                    <Row>
                      <Col md="15">
                        <Form.Group>
                          <label>{translate('Description')}:</label>
                          <Form.Control cols="80"  onChange={this.descrptionChange} rows="4" as="textarea" ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Button className="btn-fill pull-right" type="submit" variant="info" onClick={this.saveRequest}>{translate('Save request')}</Button>
                   
                  </Form>
                </Card.Body>
              </Card>
            </Col>


            <Col lg="12" xl="5">
              
              <Calendar state={this.state.calendarState} ref= {this.childRef } onChange={this.calendarChange}/>
              
            </Col>
          </Row>
          
        </Container>
        );
    }
}

export default RecoveryVacation 