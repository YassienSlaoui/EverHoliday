import React, { Component } from 'react'
import '../css/Request.css';
import collaboratorService from '../../servicees/CollaborateurServices';
import PaidRequestService from '../../servicees/PaidRequestService';
import Calendar from '../calendor/calendar6';
import dateFormat from "dateformat";
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl';
import HolidayService from '../../servicees/HolidayService'
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
import User from 'views/UserProfile';
import CollaborateurServices from '../../servicees/CollaborateurServices';
class PaidVacation extends Component {
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
            selectedType:"Full Day",
            paidRequest:[],
            allrequest:0,
            holidays:[]
        }
        
       
        this.calendarChange=this.calendarChange.bind(this)
        this.childRef= React.createRef();
       
        this.dates=this.dates.bind(this);
        this.deletelist=this.deletelist.bind(this);
        this.calculeBalance=this.calculeBalance.bind(this)
        this.saveRequest=this.saveRequest.bind(this)
        this.descrptionChange=this.descrptionChange.bind(this);
        this.calculeCumulativeBalance=this.calculeCumulativeBalance.bind(this);
        this.changeSelect=this.changeSelect.bind(this);
      
    }
      
    // step 3
    componentDidMount(){
      collaboratorService.getUserById(sessionStorage.getItem("user")).then( (res) =>{
        
        let user = res.data;
        this.setState({
          cumulative :user.solde.cumulativeBalance,
          annual: user.solde.annualBalance,
          remainder:user.solde.remainder ,
          user:user,
          soldes:user.solde.cumulativeBances   
        })
       
    });
    PaidRequestService.getPaidRequest().then((res) => {
      res.data.map(request=>{
        if(request.collaborator.id===parseInt(sessionStorage.getItem('user'))&&request.statut==="processed")
              this.setState({allrequest:this.state.allrequest+request.balanceUsed})
      })
  });
  HolidayService.getHoliday().then(res => {
    this.setState({ holidays: res.data});

});
    }
    
    //show to collaborator his cumulative balance
    calculeCumulativeBalance () {
      let a=0
      if(this.state.soldes!=[] && this.state.soldes!=null){
         
        this.state.soldes.map(solde=> a=a+solde.balance)
      }
      return a
    }
    // calacule Duration of request with knowing holiday
    calculeAtt(a,b){
      let z = Math.ceil(((a.getTime()-b.getTime())/(1000 * 3600 * 24)+1))
      let i =new Date(b.getTime());
      for( i ;i<=a;i.setDate(i.getDate()+1)){
        this.state.holidays.map(map=>{
        if (dateFormat(i, "yyyy-mm-dd")==map.date&&i.getDay()!=0&&i.getDay()!=6){ 
         
          z=z-map.duration
        }})
         if (i.getDay()==0||i.getDay()==6){
          z=z-1
        }
      }
      return z
    }
  // Add day with his start and end date with his duration
    add(){

          const element = this.childRef.current;
          if(this.state.list=[]){
          if(element.state.startDate!=null ){
            if(element.state.endDate!=null){
        
        this.setState(state1 =>{return{calendar: element.state,startDate:element.state.startDate}})
              let DateReq = {
          startDate:dateFormat(element.state.startDate, "yyyy-mm-dd"),
          endDate:dateFormat(element.state.endDate, "yyyy-mm-dd"),
          duration:Math.ceil((element.state.endDate.getTime()-element.state.startDate.getTime())/(1000 * 3600 * 24)+1)
        }
        this.state.list.push([element.state.startDate,element.state.endDate,this.calculeAtt(element.state.endDate,element.state.startDate)])
        this.state.list1.push(DateReq)
        this.setState({list:this.state.list,list1:this.state.list1})
      }else{
        alert("entre EndDate")
      }
        }else{
          alert("entre startDate")
        }
        
    }}
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
    // Table of date
    dates(){
      if(this.state.list!=[]){
        
        return (
          <table className = "table table-striped table-bordered" style={{padding:"0px",margin:"0px"}}>
                            <thead>
                                <tr>
                                    <th>  Start Date</th>
                                    <th>End Date</th>
                                    <th> Duration</th>
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
    saveRequest= (e) =>{
      e.preventDefault();
      if(this.state.list1.length!=0){
      let Request = {
         collaborator : this.state.user,
         description : this.state.description,
         balanceUsed :this.calculeBalance(),
         datesRequest:this.state.list1,
         requestDate:dateFormat((new Date()), "yyyy-mm-dd"),
         statut: "Pending",
         typeOfTime:this.state.selectedType
      }
      let balance =(this.state.annual+this.calculeCumulativeBalance())
      let differenceBtwnDate= this.state.list[0][0].getMonth()-(new Date()).getMonth()
      if(balance+differenceBtwnDate>=this.calculeBalance()+this.state.allrequest){
        PaidRequestService.createPaidRequest(Request).then(res=>{
          this.props.history.push('/admin/Home');
         
        })

      }else{
        alert('solde insuffisant')
      }}else{
        alert('aa')
      }
    }
    descrptionChange = (event) =>{
      this.setState({description: event.target.value})
    }
    changeSelect= (event) =>{
      this.setState({selectedType: event.target.value})
    }
    render() {
   var a  =JSON.parse(JSON.stringify(this.state.user));
    
      
  
 
        return (
          
        <Container fluid>
            <Row>
              <Col lg="12" xl="6">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">{translate('Paid vacation')}</Card.Title>
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
                      
                        <br/>

                        <Col md="12">
                                        <label  style={{marginLeft: "10px",color:"#1DC7EA"}} htmlFor="CumulativeB" >{translate('Cumulative Balance')}:   {this.calculeCumulativeBalance()} </label>
                                       
                                        <br></br>
                                        <label style={{color:"#1DC7EA", marginLeft: "10px"}} htmlFor="AnnualB" >{translate('Annual Balance')}:   {this.state.annual}</label>
                                       <br></br>
                                       <label style={{color:"#1DC7EA", marginLeft: "10px"}} htmlFor="AnnualB" >{translate('Total balance')}:   {(this.state.annual+this.calculeCumulativeBalance())}</label>
                                       <br></br>
                                        <label style={{color:"#1DC7EA", marginLeft: "10px"}} htmlFor="PendingB" >{translate('Balance of pending requests')}: {this.state.allrequest} </label>
                                        <label style={{color:"#1DC7EA", marginLeft: "10px",display:"block"}} htmlFor="startDate">{translate('Balance of request')}: {this.calculeBalance()}</label>
                                        </Col>
                                        <br></br>
                        
                        
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
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


              <Col xl="5" lg="12">
                
                <Calendar state={this.state.calendarState} ref= {this.childRef } onChange={this.calendarChange}/>
                
              </Col>
            </Row>
            
          </Container>
        );
    }
}

export default injectIntl(PaidVacation) 