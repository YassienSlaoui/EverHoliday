import React, { Component } from 'react'
import '../css/Request.css';
import collaboratorService from '../../servicees/CollaborateurServices';
import UnPaidRequestService from '../../servicees/UnPaidRequestService';
import Calendar from '../calendor/calendar5';
import dateFormat from "dateformat";
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
      if(element.state.startDate!=null ){
        if(element.state.endDate!=null){
    this.setState(state1 =>{return{calendar: element.state,startDate:element.state.startDate}})
    let DateReq={
      startDate:dateFormat(element.state.startDate.toLocaleDateString(), "yyyy-mm-dd"),
      endDate:dateFormat(element.state.endDate.toLocaleDateString(), "yyyy-mm-dd"),
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
                                        <td> {dateFormat(lists[0].toLocaleDateString(), "yyyy-mm-dd")}</td>
                                        <td> {dateFormat(lists[1].toLocaleDateString(), "yyyy-mm-dd")}</td>
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
    if(this.state.selectedType==="FullDay"){
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
  let Request = {
     collaborator : this.state.user,
     description : this.state.description,
     totalDays :this.calculeBalance(),
     datesRequest:this.state.list1,
     requestDate:dateFormat((new Date()).toLocaleDateString(), "yyyy-mm-dd"),
     statut: "processed",
     typeOfTime:this.state.selectedType
  }
  
  UnPaidRequestService.createUnPaidRequest(Request).then(res=>{
      this.props.history.push('/admin/Home');
     
    })

  
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
        return (
          <Container fluid>
          <Row>
            <Col md="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Paid vacation</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-4" md="12">
                        <Form.Group style={{display:"inline-block",paddingTop: "10px"}}>
                           <select className="custom-select" onChange={this.changeSelect} style={{width:"200px"}}>
                                          <option defaultValue value="FullDay">Full-Day</option>
                                          <option value="HalfDay">Half-Day</option>
                                          
                           </select>
                        </Form.Group>
                        <Button className="btn btn-success" onClick={this.add.bind(this)} style={{marginLeft: "10px",float:"right"}}> Add</Button>
                      </Col>
                      <Col>
                      {this.dates()}
                      
                      </Col>
                    
                      <Col md="12">                                
                                        <label style={{color:"#1DC7EA", marginLeft: "10px",display:"block"}} htmlFor="startDate">Total days: {this.calculeBalance()}</label>
                                        </Col>
                                        <br></br>

                    </Row>
                    <Row>
                      <Col md="15">
                        <Form.Group>
                          <label>Description:</label>
                          <Form.Control cols="80"  onChange={this.descrptionChange} rows="4" as="textarea" ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Button className="btn-fill pull-right" type="submit" variant="info" onClick={this.saveRequest} > Save request</Button>
                   
                  </Form>
                </Card.Body>
              </Card>
            </Col>


            <Col md="5">
              
              <Calendar state={this.state.calendarState} ref= {this.childRef } onChange={this.calendarChange}/>
              
            </Col>
          </Row>
          
        </Container>
        );
    }
}

export default UnpaidVacation 