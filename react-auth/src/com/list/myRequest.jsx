import React, { Component } from 'react';
import PaidRequestService from '../../servicees/PaidRequestService'
import ExeptionnelRequestService from '../../servicees/ExptionnelService'
import UnPaidRequestService from '../../servicees/UnPaidRequestService';
import RecoveryRequestService from '../../servicees/RecoveryRequestService';
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
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
import '../css/list.css';
class myRequest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paidRequest: [],
            unPaidRequest:[],
            exptionnel:[],
            RecoveryRequest: []
        }
        this.lists=this.lists.bind(this)
        this.Unpaidlists=this.Unpaidlists.bind(this)
        this.ExpionnelList=this.ExpionnelList.bind(this)
        this.Recoverylists=this.Recoverylists.bind(this)
        this.checkStatut=this.checkStatut.bind(this)
        this.deleteUser=this.deleteUser.bind(this)
    }

   
    deleteUser(id){
        
        PaidRequestService.deletPaidRequest(id).then( res => {
                this.setState({paidRequest: this.state.paidRequest.filter(user => user.id !== id)});
          });
    
   
    }
    deleteun(id){
        
        UnPaidRequestService.deletUnPaidRequest(id).then( res => {
                this.setState({unPaidRequest: this.state.unPaidRequest.filter(user => user.id !== id)});
          });
    
   
    }
    deleteEx(id){
        
        ExeptionnelRequestService.deletExeptionnelRequest(id).then( res => {
                this.setState({exptionnel: this.state.exptionnel.filter(user => user.id !== id)});
          });
    
   
    }
    deleteRe(id){
        
        RecoveryRequestService.deletRecoveryRequest(id).then( res => {
                this.setState({RecoveryRequest: this.state.RecoveryRequest.filter(user => user.id !== id)});
          });
    
   
    }
       
   addHolidays(){
    this.props.history.push('/admin/unit/add');
   }
    componentDidMount(){
        PaidRequestService.getPaidRequest().then((res) => {
            this.setState({ paidRequest: res.data});
        });
        UnPaidRequestService.getUnPaidRequest().then((res) => {
            this.setState({ unPaidRequest: res.data});
        });
        ExeptionnelRequestService.geExeptionnelRequest().then((res) => {
            this.setState({ exptionnel: res.data});
        });
        RecoveryRequestService.getRecoveryRequest().then((res) => {
            this.setState({ RecoveryRequest: res.data});
        });
    }
    checkStatut(value){
        if(value==="processed"){
            return(<td className="text-secondary">{value} </td> );
        }else if(value==="accepted"){
            return(<td className="text-success">{value} </td> );
        }else if(value==="refused"){
            return(<td className="text-danger">{value} </td> );
        }
    }
    lists(){
       
            return(
           
                <tbody>
                 {   
                       this.state.paidRequest.filter(val =>{if(val.statut==="processed"){return val}}).map(
                        paidRequests => {
                            if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
                                return(
                                    <tr key = {paidRequests.id }>
                                <td> {paidRequests.id}</td>
                                <td>{paidRequests.requestDate}</td>
                                <td>Paid Request</td>
                                
                                
                               {this.checkStatut(paidRequests.statut)} 
                               <td>{paidRequests.typeOfTime}</td>
                                <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                                <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>
                                <td><button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(paidRequests.id)} className="btn btn-danger">{translate('Delete')} </button> </td>
                                </tr>
                                )
                            }                     
                        }    
                    )                  
                 }
                  </tbody>                   
            )
        
        
    }
    Unpaidlists(){
        return(
            
            <tbody>
                {
                this.state.unPaidRequest.filter(val =>{if(val.statut==="processed"){return val}}).map(
                paidRequests => {
                    
                 if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
                  
                        return(
                         
                        <tr key = {paidRequests.id }>
                        <td> {paidRequests.id}</td>
                        <td>{paidRequests.requestDate}</td>
                       <td>Unpaid Request</td>

                       {this.checkStatut(paidRequests.statut)} 
                       <td>{paidRequests.typeOfTime}</td>
                       <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                        <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td> 
                        <td><button style={{marginLeft: "10px"}} onClick={ () => this.deleteun(paidRequests.id)} className="btn btn-danger">{translate('Delete')} </button> </td>                       
                         </tr> 
                         
                        );}})

                        }
            </tbody>


        )
            
 }
  ExpionnelList(){
    return(
        <tbody>
            {
            this.state.exptionnel.filter(val =>{if(val.statut==="processed"){return val}}).map(
            paidRequests => {
                
             if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
              
                    return(
                     
                    <tr key = {paidRequests.id }>
                    <td> {paidRequests.id}</td>
                    <td>{paidRequests.requestDate}</td>
                   <td>Exeptionnel Request</td>

                   {this.checkStatut(paidRequests.statut)} 
                   <td>{paidRequests.typeOfTime}</td>
                   <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>              
                    <td><button style={{marginLeft: "10px"}} onClick={ () => this.deleteEx(paidRequests.id)} className="btn btn-danger">{translate('Delete')} </button> </td>                       
      
                     </tr> 
                     
                    );}})

                    }
        </tbody>
    )       
    }
    Recoverylists(){
        return(
            
            <tbody>
                {
                this.state.RecoveryRequest.filter(val =>{if(val.statut==="processed"){return val}}).map(
                paidRequests => {
                    
                 if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
                  
                        return(
                         
                        <tr key = {paidRequests.id }>
                        <td> {paidRequests.id}</td>
                        <td>{paidRequests.requestDate}</td>
                       <td>Recovery Request</td>

                       {this.checkStatut(paidRequests.statut)} 
                       <td>{paidRequests.typeOfTime}</td>
                       <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                        <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td> 
                        <td><button style={{marginLeft: "10px"}} onClick={ () => this.deleteRe(paidRequests.id)} className="btn btn-danger">{translate('Delete')} </button> </td>                       
                         </tr> 
                         
                        );}})

                        }
            </tbody>


        )
            
    }                                                                        
    render() {
        return (
            
            <div>
                <br></br>
                <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>  {translate('Request Id')}</th>
                                    <th>Request date</th>
                                    <th>{translate('Type')}</th>
                                    <th> {translate('statut')}</th>
                                    <th>{translate('type of time')}</th>
                                    <th>{translate('Start Date')}</th>
                                    <th>{translate('End Date')}</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {this.lists()}
                            {this.Unpaidlists()}
                            {this.ExpionnelList()}
                            {this.Recoverylists()}
                        </table>
                        
                </div>
            
              {/* <div className="backdiv">
                   
                   <Row style={{margin:"10px"}}>
                        <Col md="4">
                            <img src={require("assets/img/default-avatar.png").default} className="img1" alt=""/>
                            <p>Yassine Slaoui</p>

                        </Col>
                        <Col md="7">
                            <p>Type of Request:Paid Vacacion</p>
                            <p>Timing from 10/12/10 to 10/20/10</p>
                            <p>Days: 12</p>

                        </Col>
                        <Col>
                        <button style={{marginLeft: "10px", float:"right",border:"none"}}  className="btn btn-danger">Refuse</button>
                           <button style={{marginLeft: "10px",float:"right",border:"none"}} className="btn btn-success">Validate</button> 
                        </Col>
                        
                   </Row>
                    
               </div>*/}
        </div>
        );
    }
}

export default myRequest;
