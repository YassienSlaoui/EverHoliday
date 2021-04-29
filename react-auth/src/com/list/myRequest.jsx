import React, { Component } from 'react';
import PaidRequestService from '../../servicees/PaidRequestService'
import UnPaidRequestService from '../../servicees/UnPaidRequestService';
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
            unPaidRequest:[]
        }
        this.lists=this.lists.bind(this)
        this.Unpaidlists=this.Unpaidlists.bind(this)
        this.checkStatut=this.checkStatut.bind(this)
        this.deleteUser=this.deleteUser.bind(this)
    }

   
    deleteUser(id){
        
        PaidRequestService.deletPaidRequest(id).then( res => {
                this.setState({paidRequest: this.state.paidRequest.filter(user => user.id !== id)});
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
                       this.state.paidRequest.map(
                        paidRequests => {
                            if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
                                return(
                                    <tr key = {paidRequests.id }>
                                <td> {paidRequests.id}</td>
                                
                                
                               {this.checkStatut(paidRequests.statut)} 
                               <td>{paidRequests.typeOfTime}</td>
                                <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}>From {dates.startDate} to {dates.endDate}</p>)}</td> 
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
                this.state.unPaidRequest.map(
                paidRequests => {
                    
                 if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
                  
                        return(
                         
                        <tr key = {paidRequests.id }>
                        <td> {paidRequests.id}</td>
                       

                       {this.checkStatut(paidRequests.statut)} 
                       <td>{paidRequests.typeOfTime}</td>
                        <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}>From {dates.startDate} to {dates.endDate}</p>)}</td> 
                                               
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
                                    <th>  Request Id</th>
                                    <th> statut</th>
                                    <th>type of time</th>
                                    <th>Timing</th>
                                </tr>
                            </thead>
                            {this.lists()}
                            {this.Unpaidlists()}
                        </table>
                        
                </div>
            
               <div className="backdiv">
                   <h5>Request details</h5>
                   <Row>
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
                        <button style={{marginLeft: "10px", float:"right"}}  className="btn btn-danger">X </button>
                           <button style={{marginLeft: "10px",float:"right"}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button> 
                        </Col>
                        
                   </Row>
                    
               </div>
               </div>
        );
    }
}

export default myRequest;
