
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

class Request extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paidRequest: [],
            collaborator:[],
            request:"",
            unPaidRequest:[],
            exeptionnel:[],
            RecoveryRequest:[]

        }
        this.lists=this.lists.bind(this)
        this.lists1=this.lists1.bind(this)
        this.checkStatut=this.checkStatut.bind(this)
        this.deleteUser=this.deleteUser.bind(this)
        this.RequestRejecte=this.RequestRejecte.bind(this)
        this.RequestSuccess=this.RequestSuccess.bind(this)
        this.getrequestById=this.getrequestById.bind(this)
        this.Unpaidlists=this.Unpaidlists.bind(this)
        this.exeptionnelList=this.exeptionnelList.bind()
        this.Recoverylists=this.Recoverylists.bind(this)
    }
    getrequestById(id){
        PaidRequestService.getPaidRequestById(id).then(res=>{
            
            this.setState({
             request:res.data
         })
         
     })
    }
    RequestSuccess (id){
  
        let Request ={statut:"accepted"}
        PaidRequestService.statut(Request,id).then(res=>{
            PaidRequestService.getPaidRequest().then(res=>{
                this.getrequestById(id)
                setTimeout(() => {
                    if(this.state.request!=""){
                        let b =this.state.request.balanceUsed
                        let a =0
                        let user1 =JSON.parse(JSON.stringify(this.state.request.collaborator));
                        if(this.state.request.collaborator.solde.cumulativeBances!=null){
                            this.state.request.collaborator.solde.cumulativeBances.map(solde=> a=a+solde.balance)
                        if(a>b){
                            user1.solde.cumulativeBances.map(solde=>
                                {
                               if(solde.balance>a){
                                 solde.balance=solde.balance-a; 
                                 return;
                               }
                               else{solde.balance=0; a=a-solde.balance;}
                     
                             })
                         
                           
                         }else{
                           
                           user1.solde.cumulativeBances.map(solde=>solde.balance=0)
                             user1.solde.annualBalance=this.state.annual-(b-a)
                           }
                        } else{
                            user1.solde.annualBalance=user1.solde.annualBalance-(b)
                        }
                        CollaborateurServices.updateUser(user1,user1.id);
                        }
                        
                 } , 1000);  
                this.setState({ paidRequest: res.data});
            })
        })
         
        
      
        
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
       
        let Request ={statut:"refused"}
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
        this.state.collaborator.map(collaborators =>
            
                  this.state.paidRequest.map(
                   paidRequests => {

                    if(paidRequests.collaborator.id===collaborators.id && paidRequests.statut==="processed"){

                           return(
                            <tbody key = {collaborators.id }>
                                  {
                           <tr key = {paidRequests.id }>
                           <td> {paidRequests.id}</td>
                           <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>
                           
                          {this.checkStatut(paidRequests.statut)} 
                          <td>{paidRequests.typeOfTime}</td>
                          <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>                            <td>
                           <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.RequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                           <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.RequestSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                           </td>                         
                            </tr>
                             }
                            </tbody> 
                           )
                            }else if(paidRequests.collaborator.team==="admin RH" && paidRequests.statut==="processed" && sessionStorage.getItem('role')==="Directeur")    {

                                return(
                                    <tbody>
                                          {
                                   <tr key = {paidRequests.id }>
                                   <td> {paidRequests.id}</td>
                                   <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>
                                   
                                  {this.checkStatut(paidRequests.statut)} 
                                  <td>{paidRequests.typeOfTime}</td>
                                  <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                            <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>                            <td>
                                   <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.RequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                                   <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.RequestSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                                   </td>                         
                                    </tr>
                                     }
                                    </tbody> 
                                   )
                            }else{

                            }          
                   }    
               ))   )               
            }
            lists1(){
                return(
                          this.state.paidRequest.map(
                           paidRequests => {

                          if(paidRequests.collaborator.team==="admin RH" && paidRequests.statut==="processed" && sessionStorage.getItem('role')==="Directeur") 
        
                                        return(
                                            <tbody>
                                                  {
                                           <tr key = {paidRequests.id}>
                                           <td> {paidRequests.id}</td>
                                           <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>
                                           
                                          {this.checkStatut(paidRequests.statut)} 
                                          <td>{paidRequests.typeOfTime}</td>
                                          {paidRequests.datesRequest.map(dates=><td key={dates.id}> <p>{dates.startDate}</p> </td>)}
                                        
                                        {paidRequests.datesRequest.map(dates=><td key={dates.id}><p> {dates.endDate} </p></td> )}                     
                                              <td>
                                           <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.RequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                                           <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.RequestSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                                           </td>                         
                                            </tr>
                                             }
                                            </tbody> 
                                           )
                                            
                           }    
                       ))               
                    }
            Unpaidlists(){
                return(
                    <tbody>
                        {
                        this.state.unPaidRequest.filter(val=>{if(sessionStorage.getItem('role')==="RH" ||sessionStorage.getItem('role')==="RH grp"){ return val}}).map(
                        paidRequests => {
                            
                         if(paidRequests.statut==="processed" ){
                          
                                return(
                                 
                                <tr key = {paidRequests.id }>
                                <td> {paidRequests.id}</td>
                                <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>

                               {this.checkStatut(paidRequests.statut)} 
                               <td>{paidRequests.typeOfTime}</td>
                               <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>                                 <td>
                                <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.UnRequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                                <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.UnRequestSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                                </td>                         
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
                        this.state.RecoveryRequest.filter(val=>{if(sessionStorage.getItem('role')==="RH" ||sessionStorage.getItem('role')==="RH grp"){ return val}}).map(
                        paidRequests => {
                            
                         if(paidRequests.statut==="processed"){
                          
                                return(
                                 
                                <tr key = {paidRequests.id }>
                                <td> {paidRequests.id}</td>
                                <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>

                               {this.checkStatut(paidRequests.statut)} 
                               <td>{paidRequests.typeOfTime}</td>
                               <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>                                 <td>
                                <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.RecoveryRequestRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                                <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.RecoveryRequestSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                                </td>                         
                                 </tr> 
                                 
                                );}})

                                }
                    </tbody>


                )
                    
                                 }                 
   exeptionnelList (){
    return(
        
        <tbody>
            {
            this.state.exeptionnel.filter(val=>{if(sessionStorage.getItem('role')==="RH" ||sessionStorage.getItem('role')==="RH grp"){ return val}}).map(
            paidRequests => {
                
             if(paidRequests.statut==="processed"){
              
                    return(
                     
                    <tr key = {paidRequests.id }>
                    <td> {paidRequests.id}</td>
                    <td> {paidRequests.collaborator.firstname +" "+ paidRequests.collaborator.lastname}</td>

                   {this.checkStatut(paidRequests.statut)} 
                   <td>{paidRequests.typeOfTime}</td>
                   <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.startDate} </p>)}</td> 
                    <td>{paidRequests.datesRequest.map(dates=><p key={dates.id}> {dates.endDate} </p>)}</td>                     <td>
                    <button style={{marginLeft: "10px"}} onClick={(e)=>{e.preventDefault();  this.exeptionnelRejecte(paidRequests.id)}} className="btn btn-danger">X </button>
                    <button style={{marginLeft: "10px"}} onClick={ (e) =>{e.preventDefault(); this.exeptionnelSuccess(paidRequests.id)}} className="btn btn-success"><div className="nc-icon nc-check-2"></div> </button>
                    </td>                         
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
                                    <th>{translate('collaborator')}</th>
                                    <th> {translate('statut')}</th>
                                    <th>{translate('type of time')}</th>
                                    <th>{translate('Start Date')}</th>
                                    <th>{translate('End Date')}</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            {this.lists()}
                            {this.lists1()}
                            {this.Unpaidlists()}
                            {this.Recoverylists()}
                        </table>
                        
                </div>
            
               
               </div>
        );
    }
}

export default Request;
