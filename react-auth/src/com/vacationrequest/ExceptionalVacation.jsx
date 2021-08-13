import React, { Component } from 'react'
import ExeptionnelRequestService from '../../servicees/ExptionnelService'
import collaboratorService from '../../servicees/CollaborateurServices';
import Calendar from '../calendor/calendor4'
import dateFormat from "dateformat";
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl';
import '../css/Request.css';
import Select from 'react-select';
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
class ExceptionVacation extends Component {
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
          UnpaidRequest:[],
          SelectTypeVacacion:"",
          duration:0,
          option:[],
          collaborators:[],
          options:[],
          users:""
      }
      this.calendarChange=this.calendarChange.bind(this)
      this.childRef= React.createRef();
      this.dates=this.dates.bind(this);
      this.deletelist=this.deletelist.bind(this);
      this.saveRequest=this.saveRequest.bind(this)
      this.descrptionChange=this.descrptionChange.bind(this);
      this.changeSelect=this.changeSelect.bind(this);
      this.calculeBalance=this.calculeBalance.bind(this);
      this.selectRH=this.selectRH.bind(this)
      this.addRH=this.addRH.bind(this)

  }
  // Add day with his start and end date with his duration
    add(){
      const element = this.childRef.current;
      const b=new Date(element.state.startDate.getTime());
      b.setDate(element.state.startDate.getDate()+this.state.duration-1)
      if(element.state.startDate!=null ){
        if(this.state.duration!=0){
    this.setState(state1 =>{return{calendar: element.state,startDate:element.state.startDate}})
    let DateReq={
      startDate:dateFormat(element.state.startDate.toLocaleDateString(), "yyyy-mm-dd"),
      endDate:dateFormat(b.toLocaleDateString(), "yyyy-mm-dd"),
      duration:Math.ceil((b.getTime()-element.state.startDate.getTime())/(1000 * 3600 * 24)+1)
    }
    this.state.list.push([element.state.startDate,b,Math.ceil((b.getTime()-element.state.startDate.getTime())/(1000 * 3600 * 24)+1)])
    this.state.list1.push(DateReq)
    this.setState({list:this.state.list,list1:this.state.list1})
  }else{
    alert("entre une select")
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
//delete date selected 
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
// function to calcule balance use in vancatoin
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
// Save vacation request
saveRequest= (e) =>{
  e.preventDefault();
  if(this.state.list1.length!=0){
    if(sessionStorage.getItem('role')!="RH"){
      let Request = {
        collaborator : this.state.user,
        description : this.state.description,
        totalDays :this.calculeBalance(),
        datesRequest:this.state.list1,
        requestDate:dateFormat((new Date()).toLocaleDateString(), "yyyy-mm-dd"),
        statut: "Pending",
        typeOfTime:this.state.selectedType,
        vacacioType:this.state.SelectTypeVacacion.value
     }
     console.log(Request)
     
     ExeptionnelRequestService.creatExeptionnelRequest(Request).then(res=>{
         this.props.history.push('/admin/Home');
        
       })
    }else if(sessionStorage.getItem('role')==="RH" && this.state.users===""){
      let Request = {
        collaborator : this.state.user,
        description : this.state.description,
        totalDays :this.calculeBalance(),
        datesRequest:this.state.list1,
        requestDate:dateFormat((new Date()).toLocaleDateString(), "yyyy-mm-dd"),
        statut: "accepted",
        typeOfTime:this.state.selectedType,
        vacacioType:this.state.SelectTypeVacacion.value
     }
     
     ExeptionnelRequestService.creatExeptionnelRequest(Request).then(res=>{
         this.props.history.push('/admin/Home');
        
       })
    }else if(sessionStorage.getItem('role')==="RH" && this.state.users!=""){
      let Request = {
        collaborator : this.state.users.value,
        description : this.state.description,
        totalDays :this.calculeBalance(),
        datesRequest:this.state.list1,
        requestDate:dateFormat((new Date()).toLocaleDateString(), "yyyy-mm-dd"),
        statut: "accepted",
        typeOfTime:this.state.selectedType,
        vacacioType:this.state.SelectTypeVacacion.value
     }
     console.log(Request)
     
     ExeptionnelRequestService.creatExeptionnelRequest(Request).then(res=>{
         this.props.history.push('/admin/Home');
        
       })
    }
  
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
changeSelectType= (SelectTypeVacacion) =>{
  this.setState({SelectTypeVacacion})
  this.setState({duration:SelectTypeVacacion.value.duration})
}  
// if user is RH he can create Expetionnal vacacion to Collaborator
selectRH(){
  if(sessionStorage.getItem('role')==="RH"){
    return(
      <div className = "form-group">
      <label> {translate('Collaborator')} </label>
      <Select 
           onChange={change=>this.changevalidatorHandler(change)}
           options={this.state.options}
           />
          
      </div>
    )
  }
  
}
//butoon to Rh add a vacacion type
go(){
  this.props.history.push('/admin/vacationrequest/Type');
}
addRH(){
  if(sessionStorage.getItem('role')==="RH"){
    return(
      <Button className="btn btn-success" onClick={this.go.bind(this)} style={{marginLeft: "10px",float:"right"}}> +</Button>
    )
  }
  
}



changevalidatorHandler= (users) => {
  this.setState({users:users});
  
}

componentDidMount(){
  collaboratorService.getUserById(sessionStorage.getItem("user")).then( (res) =>{
    let user = res.data;
    this.setState({
      user:user,
    })})
  collaboratorService.getUser().then((res)=>{
      this.setState({ collaborators: res.data,
        options : res.data.map(
            user => {
                return { value: user, label: user.firstname+" "+user.lastname };
            }
    )
   
});
});
ExeptionnelRequestService.getType().then(res=>{
  this.setState({option:res.data})
})

}


    render() {console.log(this.state.duration)
     let options =this.state.option.map(
        user => 
       {return { value: user, label: user.name }; })
        return (
          
          <Container fluid>
          <Row>
            <Col lg="12" xl="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">{translate('Exceptional vacation')}</Card.Title>
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
                          {this.selectRH()}
                        </Form.Group>
                        <Button className="btn btn-success" onClick={this.add.bind(this)} style={{marginLeft: "10px",float:"right"}}> {translate('Add')}</Button>
                      </Col>
                      <Col>
                      {this.dates()}
                      
                      </Col>
                    
                      <Col md="12">                                
                                        <label style={{color:"#1DC7EA", marginLeft: "10px",display:"block"}} htmlFor="startDate">{translate('Total days')}: {this.calculeBalance()}</label>
                                        </Col>
                                        <br></br>

                    </Row>
                    <Col md="12">
                                        <label  style={{color:"#1DC7EA",marginLeft: "10px"}} htmlFor="CumulativeB" >{translate('Select the type of vacation')}: </label>
                                        {/*<label type="number" id="CumulativeB" name="Cumulative balance" >{balance.cumelative}</label>*/}
                                        <br></br>
                                        </Col>
                        <Col className="pr-1" md="12">
                          <Form.Group  style={{display:"inline-block",paddingTop: "10px",width:"75%"}}>
                            <Row>
                              <Col md="9">
                              <Select onChange={this.changeSelectType} options={options} styles={{display:"inline-block"}}/> 
                              </Col>
                              <Col md="2">
                                {this.addRH()}
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                    <Row>
                      <Col md="15">
                        <Form.Group>
                          <label>{translate('Description')}:</label>
                          <Form.Control cols="80"  onChange={this.descrptionChange} rows="4" as="textarea" ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Button className="btn-fill pull-right" type="submit" variant="info" onClick={this.saveRequest} > {translate('Save request')}</Button>
                   
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
export default ExceptionVacation 