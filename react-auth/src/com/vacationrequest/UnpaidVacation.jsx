import React, { Component } from 'react'
import '../css/Request.css';
import collaboratorService from '../../servicees/CollaborateurServices';
import UnPaidRequestService from '../../servicees/UnPaidRequestService';
import Calendar from '../calendor/calendar6';
import dateFormat from "dateformat";
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl';
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
class UnpaidVacation extends Component {
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
            UnpaidRequest:[]
        }
        this.calendarChange=this.calendarChange.bind(this)
        this.childRef= React.createRef();
        this.dates=this.dates.bind(this);
        this.deletelist=this.deletelist.bind(this);
        this.saveRequest=this.saveRequest.bind(this)
        this.descrptionChange=this.descrptionChange.bind(this);
        this.changeSelect=this.changeSelect.bind(this);
        this.calculeBalance=this.calculeBalance.bind(this)

    }

    // step 3
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
deletelist(i){
      
  this.state.list.splice(i,1)
  this.state.list1.splice(i,1)
  this.setState({list:this.state.list,list1:this.state.list1})
}    
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
     typeOfTime:this.state.selectedType
  }
  
  UnPaidRequestService.createUnPaidRequest(Request).then(res=>{
      this.props.history.push('/admin/Home');
     
    })
  }else{
    alert('aa')
  }
  
}
descrptionChange = (event) =>{
  this.setState({description: event.target.value})
}
changeSelect= (event) =>{
  this.setState({selectedType: event.target.value})
}    
componentDidMount(){
  collaboratorService.getUserById(sessionStorage.getItem("user")).then( (res) =>{
    
    let user = res.data;
    this.setState({
      
      user:user,
       
    })
   
});

}

    
    render() {
      const { intl } = this.props
        return (
          
          <Container fluid>
          <Row>
            <Col lg="12" xl="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">{translate('Unpaid vacation')}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-4" md="12">
                        <Form.Group style={{display:"inline-block",paddingTop: "10px"}}>
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
                                            
                                          
                           </select>
                        </Form.Group>
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


            <Col lg="12" xl="6">
              
              <Calendar state={this.state.calendarState} ref= {this.childRef } onChange={this.calendarChange}/>
              
            </Col>
          </Row>
          
        </Container>
        );
    }
}

export default injectIntl(UnpaidVacation) 