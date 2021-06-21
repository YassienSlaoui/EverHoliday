import React, { Component } from 'react';
import PaidRequestService from '../../servicees/PaidRequestService'
import ExeptionnelRequestService from '../../servicees/ExptionnelService'
import UnPaidRequestService from '../../servicees/UnPaidRequestService';
import RecoveryRequestService from '../../servicees/RecoveryRequestService';
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl';
import translate from "../../i18nProvider/translate"

import '../css/list.css';
class alt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paidRequest: [],
            unPaidRequest:[],
            exptionnel:[],
            RecoveryRequest: [],
            select:"paidrequest"
        }
        this.lists=this.lists.bind(this)
        this.Unpaidlists=this.Unpaidlists.bind(this)
        this.ExpionnelList=this.ExpionnelList.bind(this)
        this.Recoverylists=this.Recoverylists.bind(this)
        this.checkStatut=this.checkStatut.bind(this)
        this.deleteUser=this.deleteUser.bind(this)
        this.changeSelect=this.changeSelect.bind(this)
        this.list=this.list.bind(this)
        this.transl=this.transl.bind(this)
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
            <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    
                                    <th>Request date</th>
                                    <th>{translate('Type')}</th>
                                    <th> {translate('statut')}</th>
                                    <th>{translate('type of time')}</th>
                                    <th>{translate('Start Date')}</th>
                                    <th>{translate('End Date')}</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
             {   
                   this.state.paidRequest.filter(val =>{if(val.statut==="Pending"){return val}}).map(
                    paidRequests => {
                        if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
                            return(
                                <tr key = {paidRequests.id }>
                            <td>{paidRequests.requestDate}</td>
                            <td>Paid Request</td>
                            
                            
                           {this.checkStatut(paidRequests.statut)} 
                           <td>{paidRequests.typeOfTime}</td>
                            <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                            <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>
                            <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {(new Date(dates.endDate).getTime()-new Date(dates.startDate).getTime())/(1000 * 3600 * 24)+1}  </p>)}</td>
                            <td><button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(paidRequests.id)} className="btn btn-danger">{translate('Delete')} </button> </td>
                            </tr>
                            )
                        }                     
                    }    
                )                  
             }
              </tbody>
                            
                           
                        </table>
                        
                </div>
                               
        )
    
    
}
Unpaidlists(){
    return(
        <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    
                                    <th>Request date</th>
                                    <th>{translate('Type')}</th>
                                    <th> {translate('statut')}</th>
                                    <th>{translate('type of time')}</th>
                                    <th>{translate('Start Date')}</th>
                                    <th>{translate('End Date')}</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            
                            <tbody>
            {
            this.state.unPaidRequest.filter(val =>{if(val.statut==="Pending"){return val}}).map(
            paidRequests => {
                
             if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
              
                    return(
                     
                    <tr key = {paidRequests.id }>
                    <td>{paidRequests.requestDate}</td>
                   <td>Unpaid Request</td>

                   {this.checkStatut(paidRequests.statut)} 
                   <td>{paidRequests.typeOfTime}</td>
                   <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.duration} </p>)}</td>

                    <td><button style={{marginLeft: "10px"}} onClick={ () => this.deleteun(paidRequests.id)} className="btn btn-danger">{translate('Delete')} </button> </td>                       
                     </tr> 
                     
                    );}})

                    }
        </tbody>
                        </table>
                        
                </div>
        


    )
        
}
ExpionnelList(){
return(
    <div className = "row">
    <table className = "table table-striped table-bordered">
        <thead>
            <tr>
                
                <th>Request date</th>
                <th>{translate('Type')}</th>
                <th> {translate('statut')}</th>
                <th>{translate('type of time')}</th>
                <th>{translate('Start Date')}</th>
                <th>{translate('End Date')}</th>
                <th>Action</th>
            </tr>
        </thead>
        
       <tbody>
        {
        this.state.exptionnel.filter(val =>{if(val.statut==="Pending"){return val}}).map(
        paidRequests => {
            
         if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
          
                return(
                 
                <tr key = {paidRequests.id }>
                <td>{paidRequests.requestDate}</td>
               <td>Exeptionnel Request</td>

               {this.checkStatut(paidRequests.statut)} 
               <td>{paidRequests.typeOfTime}</td>
               <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>   
                <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.duration} </p>)}</td>
       
                <td><button style={{marginLeft: "10px"}} onClick={ () => this.deleteEx(paidRequests.id)} className="btn btn-danger">{translate('Delete')} </button> </td>                       
  
                 </tr> 
                 
                );}})

                }
    </tbody>
       
    </table>
    
</div>
    
)       
}
Recoverylists(){
    return(
        <div className = "row">
        <table className = "table table-striped table-bordered">
            <thead>
                <tr>
                    
                    <th>Request date</th>
                    <th>{translate('Type')}</th>
                    <th> {translate('statut')}</th>
                    <th>{translate('type of time')}</th>
                    <th>{translate('Start Date')}</th>
                    <th>{translate('End Date')}</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Action</th>
                </tr>
            </thead>
            
            <tbody>
            {
            this.state.RecoveryRequest.filter(val =>{if(val.statut==="Pending"){return val}}).map(
            paidRequests => {
                console.log(paidRequests)
             if(paidRequests.collaborator.id===JSON.parse(sessionStorage.getItem('user'))){
                    
                    return(
                     
                    <tr key = {paidRequests.id }>
                    <td>{paidRequests.requestDate}</td>
                   <td>Recovery Request</td>

                   {this.checkStatut(paidRequests.statut)} 
                   <td>{paidRequests.typeOfTime}</td>
                   <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {new Date(dates.endDate).getTime()-new Date(dates.startDate).getTime()} </p>)}</td>
                    <td>{paidRequests.startHour}</td>
                    <td>{paidRequests.endHour}</td>
                    <td><button style={{marginLeft: "10px"}} onClick={ () => this.deleteRe(paidRequests.id)} className="btn btn-danger">{translate('Delete')} </button> </td>                       
                     </tr> 
                     
                    );}})

                    }
        </tbody>

           
        </table>
        
</div>
       

    )
        
}   
    changeSelect=(event)=>{
        this.setState({select:event.target.value})
    }
    list(a){
        if(a==="paidrequest"){
            return this.lists()
        }else if(a==="unpaid"){
            return this.Unpaidlists()
        }else if(a==="recovery"){
            return this.Recoverylists()
        }else if(a==="exceptional"){
            return this.ExpionnelList()
        }
    }   
    transl(a){
        return translate(a);
    }                                                              
    render() {
        
        return (
            
            <div>
                <br></br>
                <select className="custom-select" onChange={this.changeSelect} style={{width:"200px"}}>
                                            
                                            <FormattedMessage id='Paid vacation' key={'op' + '-' + 'b'}>
                                              {(message) => <option defaultValue value="paidrequest">{message}</option>}
                                             </FormattedMessage>
                                            <FormattedMessage id='Unpaid vacation' key={'op' + '-' + 'a'}>
                                              {(message) => <option value="unpaid">{message}</option>}
                                            </FormattedMessage>
                                            <FormattedMessage id='Recovery vacation' key={'op' + '-' + 'c'}>
                                              {(message) => <option defaultValue value="recovery">{message}</option>}
                                             </FormattedMessage>
                                            <FormattedMessage id='Exceptional vacation' key={'op' + '-' + 'fa'}>
                                              {(message) => <option value="exceptional">{message}</option>}
                                            </FormattedMessage>
                                            
                 </select>
                
                            
                            {this.list(this.state.select)}
                           
                        
            
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

export default alt;
