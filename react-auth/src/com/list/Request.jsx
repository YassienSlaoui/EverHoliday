
import React, { Component } from 'react';
import PaidRequestService from '../../servicees/PaidRequestService'
import UnPaidRequestService from '../../servicees/UnPaidRequestService';
import RecoveryRequestService from '../../servicees/RecoveryRequestService';
import UnitService from '../../servicees/UnitService'
import CollaborateurServices from '../../servicees/CollaborateurServices'
import ExeptionnelRequestService from '../../servicees/ExptionnelService'
import { I18nPropvider, LOCALES } from '../../i18nProvider';
import translate from "../../i18nProvider/translate"
import '../css/list.css';
import { FormattedMessage} from 'react-intl';
// request list with option give to RH option to valiate recovery-exeptionnel-recuperation vacation
class Request extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paidRequest: [],
            collaborator:[],
            request:"",
            unPaidRequest:[],
            exeptionnel:[],
            RecoveryRequest:[],
            justis:[],
            col:"",
            select:"paidrequest"

        }
        this.lists=this.lists.bind(this)
        this.lists1=this.lists1.bind(this)
        this.checkStatut=this.checkStatut.bind(this)
        this.deleteUser=this.deleteUser.bind(this)
        this.RequestRejecte=this.RequestRejecte.bind(this)
        this.RequestSuccess=this.RequestSuccess.bind(this)
        this.getrequestById=this.getrequestById.bind(this)
        this.Unpaidlists=this.Unpaidlists.bind(this)
        this.exeptionnelList=this.exeptionnelList.bind(this)
        this.Recoverylists=this.Recoverylists.bind(this)
        this.changeJusti=this.changeJusti.bind(this)
    }
    getrequestById(id){
        PaidRequestService.getPaidRequestById(id).then(res=>{
            
            this.setState({
             request:res.data
         })
         
     })
    }
    getcoltById(id){
        CollaborateurServices.getUserById(id).then(res=>{

            this.setState({
             col:res.data
             
         })
         console.log(this.state.col)

     })
    }
    RequestSuccess (id,col1){
      this.getcoltById(col1)
      this.getrequestById(id)
      console.log(this.state)
      let Request ={statut:"accepted"}
      setTimeout(() => {
      let user1 =JSON.parse(JSON.stringify(this.state.col.solde));
      console.log(user1)
      console.log(this.state.col)
        
       PaidRequestService.statut(Request,id).then(res=>{
            PaidRequestService.getPaidRequest().then(res=>{
                console.log(user1)
                    if(this.state.request!=""){
                        let b =this.state.request.balanceUsed
                        let a =0
                      if(user1.cumulativeBances!=null){
                        user1.cumulativeBances.map(solde=> a=a+solde.balance)
                            console.log(a + "  "+b)
                        if(a>b){
                           user1.cumulativeBances.map(solde=>
                                {
                               if(solde.balance>b){
                                 solde.balance=solde.balance-b; 
                                 console.log(solde.balance)
                               }
                               else{solde.balance=0; b=b-solde.balance;}
                     
                             })
                            
 
                         
                           }
                           else{
                           user1.cumulativeBances.map(solde=>solde.balance=0)
                             user1.annualBalance=user1.annualBalance-(b-a)
                           }
                        } else{
                            user1.annualBalance=user1.annualBalance-(b)
                        }
                        console.log(user1)
                        this.state.col.solde=user1
                        CollaborateurServices.updateUser(this.state.col,this.state.col.id);
                        }
                        
                   
                this.setState({ paidRequest: res.data});
            })
        })
} , 1000);
        
    }
    UnRequestSuccess(id){
        let Request ={statut:"accepted"}
        UnPaidRequestService.statut(Request,id).then(res=>{
            UnPaidRequestService.getUnPaidRequest().then(res=>{
               
                this.setState({ unPaidRequest: res.data});
            })
        })
         
        
      
        
    }
    RecoveryRequestSuccess(id){
        let Request ={statut:"accepted"}
        RecoveryRequestService.statut(Request,id).then(res=>{
            RecoveryRequestService.getRecoveryRequest().then(res=>{
               
                this.setState({ RecoveryRequest: res.data});
            })
        })
         
        
      
        
    }
    RequestRejecte (id){
       
        let Request ={statut:"refused",justification:this.state.justis[id]}
        PaidRequestService.statut(Request,id).then(res=>{
           
            PaidRequestService.getPaidRequest().then(res=>{
                this.setState({ paidRequest: res.data});
            })
        })
    }
    UnRequestRejecte(id){
       
        let Request ={statut:"refused"}
        UnPaidRequestService.statut(Request,id).then(res=>{
           
            UnPaidRequestService.getUnPaidRequest().then(res=>{
                this.setState({ unPaidRequest: res.data});
            })
        })
    }
    RecoveryRequestRejecte(id){
       
        let Request ={statut:"refused"}
        RecoveryRequestService.statut(Request,id).then(res=>{
           
            RecoveryRequestService.getRecoveryRequest().then(res=>{
                this.setState({ RecoveryRequest: res.data});
            })
        })
    }
    exeptionnelSuccess(id){
        let Request ={statut:"accepted"}
        ExeptionnelRequestService.statut(Request,id).then(res=>{
           
            ExeptionnelRequestService.geExeptionnelRequest().then(res=>{
                this.setState({ paidRequest: res.data});
            })
        })
    }
    exeptionnelRejecte(id){
        let Request ={statut:"refused"}
        ExeptionnelRequestService.statut(Request,id).then(res=>{
           
            ExeptionnelRequestService.geExeptionnelRequest().then(res=>{
                this.setState({ paidRequest: res.data});
            })
        })
    }
    deleteUser(id){
        
        PaidRequestService.deletPaidRequest(id).then( res => {
                this.setState({paidRequest: this.state.paidRequest.filter(user => user.id !== id)});
          });
    
   
    }
    componentDidMount(){
        PaidRequestService.getPaidRequest().then((res) => {
            this.setState({ paidRequest: res.data});
        });
        UnPaidRequestService.getUnPaidRequest().then((res) => {
            this.setState({ unPaidRequest: res.data});
        });
        RecoveryRequestService.getRecoveryRequest().then((res) => {
            this.setState({ RecoveryRequest: res.data});
        });
        UnitService.collaborators(parseInt(sessionStorage.getItem('user'))).then((res) => {
            this.setState({ collaborator: res.data});
        });
        ExeptionnelRequestService.geExeptionnelRequest().then((res) => {
            this.setState({ exeptionnel: res.data});
        });
    }
    checkStatut(value){
        if(value==="Pending"){
            return(<td className="text-secondary">{value} </td> );
        }else if(value==="accepted"){
            return(<td className="text-success">{value} </td> );
        }else if(value==="refused"){
            return(<td className="text-danger">{value} </td> );
        }
    }
    changeJusti=index=> (event)=>{
        
       var justi = this.state.justis.slice(); // Make a copy of the emails first.
        justi[index] = event.target.value; // Update it with the modified email.
        this.setState({justis: justi}); 
    }
    lists(){
        return(
        this.state.collaborator.map(collaborators =>
            
                  this.state.paidRequest.map(
                   paidRequests => {

                    if(paidRequests.collaborator.id===collaborators.id && paidRequests.statut==="Pending"){
                           return(
                            
                                <tbody key = {collaborators.id }>
                                  {
                           <tr key = {paidRequests.id }>
                           
                           <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>
                           
                          <td>{paidRequests.typeOfTime}</td>
                          <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>       
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.duration} </p>)}</td>
                    <td><input key={paidRequests.id } className="form-control"  onChange={this.changeJusti(paidRequests.id)}/></td>
                     <td>
                           <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.RequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                           <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.RequestSuccess(paidRequests.id,paidRequests.collaborator.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                           </td>                         
                            </tr>
                             }
                            
                                    </tbody> 
                                   
                             
                           )
                            }else if(paidRequests.collaborator.team==="admin RH" && paidRequests.statut==="Pending" && sessionStorage.getItem('role')==="Directeur")    {

                                return(
                                    
                                        <tbody>
                                          {
                                   <tr key = {paidRequests.id }>
                                   
                                   <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>
                                   
                                  <td>{paidRequests.typeOfTime}</td>
                                  <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                            <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>       
                            <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.duration} </p>)}</td>

                     <td>
                                   <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.RequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                                   <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.RequestSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                                   </td>                         
                                    </tr>
                                     }
                                    </tbody> 
                                   
                                    
                           
                                    
                                   )
                            }else{

                            }       }   
                       
               ))                  
            )}
            lists1(){
                return(
                   

                                                
                          this.state.paidRequest.map(
                           paidRequests => {

                          if(paidRequests.collaborator.team==="admin RH" && paidRequests.statut==="Pending" && sessionStorage.getItem('role')==="Directeur") 
        
                                        return(
                                           
                                                <tbody>
                                                  {
                                           <tr key = {paidRequests.id}>
                                           
                                           <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>
                                           
                                          <td>{paidRequests.typeOfTime}</td>
                                          {paidRequests.datesRequest.map(dates=><td key={dates.id}> <p>{dates.startDate}</p> </td>)}
                                        
                                        {paidRequests.datesRequest.map(dates=><td key={dates.id}><p> {dates.endDate} </p></td> )} 
                                        <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.duration} </p>)}</td>

                                              <td>
                                           <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.RequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                                           <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.RequestSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                                           </td>                         
                                            </tr>
                                             }
                                            </tbody> 
                                            
                                            
                                           )
                                            
                             })
                       )              
                    }
            Unpaidlists(){
               
                return( 
                <div className = "row">
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                           
                            <th>{translate('collaborator')}</th>
                            <th> {translate('statut')}</th>
                            <th>{translate('type of time')}</th>
                            <th>{translate('Start Date')}</th>
                            <th>{translate('End Date')}</th>
                            <th>{translate('duration')}</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.unPaidRequest.filter(val=>{if(sessionStorage.getItem('role')==="RH" ||sessionStorage.getItem('role')==="RH grp"){ return val}}).map(
                        paidRequests => {
                           
                         if(paidRequests.statut==="Pending" && paidRequests.collaborator.team!="admin RH"){
                          
                                return(
                                 
                                <tr key = {paidRequests.id }>
                               
                                <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>

                               {this.checkStatut(paidRequests.statut)} 
                               <td>{paidRequests.typeOfTime}</td>
                               <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>       
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.duration} </p>)}</td>

                          <td>
                                <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.UnRequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                                <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.UnRequestSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                                </td>                         
                                 </tr> 
                                 
                                );}})

                                }
                    </tbody>
                </table>
                
        </div>
                   


                )
                    
                                 }  
        Recoverylists(){
            
                return(<div className = "row">
            <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                       
                        <th>{translate('collaborator')}</th>
                        <th> {translate('statut')}</th>
                        <th>{translate('type of time')}</th>
                        <th>{translate('Start Date')}</th>
                        <th>{translate('End Date')}</th>
                        <th>{translate('duration')}</th>
                        <th>From</th>
                        <th>To</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                        {
                        this.state.RecoveryRequest.filter(val=>{if(sessionStorage.getItem('role')==="RH" ||sessionStorage.getItem('role')==="RH grp"){ return val}}).map(
                        paidRequests => {
                            
                         if(paidRequests.statut==="Pending" && paidRequests.collaborator.team!="admin RH"){
                          
                                return(
                                 
                                <tr key = {paidRequests.id }>
                               
                                <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>

                               {this.checkStatut(paidRequests.statut)} 
                               <td>{paidRequests.typeOfTime}</td>
                               <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>        
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.duration} </p>)}</td>

                         <td>
                                <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.RecoveryRequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                                <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.RecoveryRequestSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                                </td>                         
                                 </tr> 
                                 
                                );}})

                                }
                    </tbody>
            </table>
            
    </div>
                   


                )
                    
                                 }                 
   exeptionnelList(){
    return(
        <div className = "row">
        <table className = "table table-striped table-bordered">
            <thead>
                <tr>
                   
                    <th>{translate('collaborator')}</th>
                    <th> {translate('statut')}</th>
                    <th>{translate('type of time')}</th>
                    <th>{translate('type of vacation')}</th>
                    <th>{translate('Start Date')}</th>
                    <th>{translate('End Date')}</th>
                    <th>{translate('duration')}</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
            {
            this.state.exeptionnel.filter(val=>{if(sessionStorage.getItem('role')==="RH" ||sessionStorage.getItem('role')==="RH grp"){ return val}}).map(
            paidRequests => {
                
             if(paidRequests.statut==="Pending" && paidRequests.collaborator.team!="admin RH"){
              
                    return(
                     
                    <tr key = {paidRequests.id }>
                   
                    <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>

                   {this.checkStatut(paidRequests.statut)} 
                   <td>{paidRequests.typeOfTime}</td>
                   <td>{paidRequests.vacacioType.name}</td>
                   <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>  
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.duration} </p>)}</td>

                   <td>
                    <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.exeptionnelRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                    <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.exeptionnelSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                    </td>                         
                     </tr> 
                     
                    );}})

                    }
        </tbody>
        </table>
        
</div>
       


    )
   }        
   list(a){
    if(sessionStorage.getItem('role')==="RH" ||sessionStorage.getItem('role')==="RH grp"){
        if(a==="paidrequest"){
            return(
                <div className = "row">
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                           
                            <th>{translate('collaborator')}</th>
                            
                            <th>{translate('type of time')}</th>
                            <th>{translate('Start Date')}</th>
                            <th>{translate('End Date')}</th>
                            <th>{translate('duration')}</th>
                            <th>{translate('justification')}</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    {this.lists() }
                    {this.lists1() }
                  </table>
                   </div>
                
                )
            
        }else if(a==="unpaid"){
            return this.Unpaidlists()
        }else if(a==="recovery"){
            return this.Recoverylists()
        }else if(a==="exceptional"){
            return this.exeptionnelList()
        }
    }else{
        return(
            <div>
                 
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                           
                            <th>{translate('collaborator')}</th>
                            <th> {translate('statut')}</th>
                            <th>{translate('type of time')}</th>
                            <th>{translate('Start Date')}</th>
                            <th>{translate('End Date')}</th>
                            <th>{translate('duration')}</th>
                            <th>action</th>
                        </tr>
                    </thead>
                {this.lists() }
                {this.lists1() }
                </table>
                   </div>
            )
    }
    
}           
changeSelect=(event)=>{
    this.setState({select:event.target.value})
}           

select(){
    if(sessionStorage.getItem('role')==="RH" ||sessionStorage.getItem('role')==="RH grp"){
       return(
           <div>
               <select className="custom-select" onChange={this.changeSelect} style={{width:"200px"}}>
                                            
                                            <FormattedMessage id='Paid vacation' key={'op' + '-' + 'b'}>
                                              {(message) => <option defaultValue value="paidrequest">{message}</option>}
                                             </FormattedMessage>
                                            <FormattedMessage id='Unpaid vacation' key={'op' + '-' + 'a'}>
                                              {(message) => {if(sessionStorage.getItem('role')==="RH" ||sessionStorage.getItem('role')==="RH grp"){return (<option value="unpaid">{message}</option>)} }}
                                            </FormattedMessage>
                                            <FormattedMessage id='Recovery vacation' key={'op' + '-' + 'c'}>
                                              {(message) => <option defaultValue value="recovery">{message}</option>}
                                             </FormattedMessage>
                                            <FormattedMessage id='Exceptional vacation' key={'op' + '-' + 'fa'}>
                                              {(message) => <option value="exceptional">{message}</option>}
                                            </FormattedMessage>
                                            
                 </select>
           </div>


       ) 
    }else{
        return(
            <div>
               <select className="custom-select" onChange={this.changeSelect} style={{width:"200px"}}>                                           
                                            <FormattedMessage id='Paid vacation' key={'op' + '-' + 'b'}>
                                              {(message) => <option defaultValue value="paidrequest">{message}</option>}
                                             </FormattedMessage>                                            
                 </select>
           </div>
        )
    }
    
}
    render() {
        return (
            
            <div>
                <br></br>
                {this.select()}
                 {this.list(this.state.select)}
               
               
               </div>
        );
    }
}

export default Request;
