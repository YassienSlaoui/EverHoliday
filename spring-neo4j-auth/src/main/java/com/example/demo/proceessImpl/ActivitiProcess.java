package com.example.demo.proceessImpl;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.Collaborator;
import com.example.demo.model.Notification;
import com.example.demo.model.OrganizationalUnit;
import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.dto.ExeptionnelRequestDTO;
import com.example.demo.dto.OrganizationalUnitDTO;
import com.example.demo.dto.PaidRequestDTO;
import com.example.demo.dto.RecoveryRequestDTO;
import com.example.demo.dto.UnpaidRequestDTO;
import com.example.demo.model.*;
import com.example.demo.model.UnpaidRequest;
import com.example.demo.model.VacacionRequest;
import com.example.demo.repository.PaidRequestRepository;
import com.example.demo.service.NotificationService;
import com.example.demo.service.OrganizationalUintService;
import com.example.demo.transformer.CollaboratorTransformer;
import com.example.demo.transformer.ExeptionnelTransformer;
import com.example.demo.transformer.PaidTransformer;
import com.example.demo.transformer.RecoveryTransformer;
import com.example.demo.transformer.UnpaidTransfromer;
import com.example.demo.service.*;
@Service
public class ActivitiProcess {
	@Autowired
	private PaidRequestRepository PaidRequestRepository;
	@Autowired
	private UnpaidRequestService unpaidRequestService;
	@Autowired
	private ExeptionnelRequestService exeptionnelRequestService;
	@Autowired
	private RecoveryRequestService recoveryRequestService;
	@Autowired 
	private PaidRequestService paidRequestService;
	   @Autowired
	  private  RuntimeService runtimeService;
	   
	   private ExeptionnelTransformer exeptionnelTransformer=new ExeptionnelTransformer();
	   
	   private RecoveryTransformer recoveryTransformer=new RecoveryTransformer();
	   
	   private PaidTransformer paidTransformer=new PaidTransformer();
	   
	   private UnpaidTransfromer unpaidTransfromer=new UnpaidTransfromer();
	   
	   private CollaboratorTransformer collaboratorTransformer=new CollaboratorTransformer() ;
	   @Autowired
		private OrganizationalUintService OrganizationalUintService;
	   @Autowired
		private EmailService EmailService;
	   @Autowired
	   private TaskService taskService;
	   
	   @Autowired
	   private NotificationService notificationService;
	  
	   
	 public ActivitiProcess() {
		} 

	public VacacionRequest startProcess(VacacionRequest PaidRequest,String type) {
		System.out.println(type=="PAID");
		 
		if(type=="PAID") {
			PaidRequestDTO Paid = paidTransformer.entityTranferToDTO((PaidRequest) PaidRequest);
			PaidRequest p=paidTransformer.entityTranferFromDTO(paidRequestService.createPaidRequest(Paid));
			String username = p.getCollaborator().getUsername();
			CollaboratorDTO validator = OrganizationalUintService.findValidator(Paid.getCollaborator());
			
			Map<String, Object> data = new HashMap<String, Object>() ;
			data.put("paidRequest", p);
			data.put("id", p.getId());
			data.put("Owner", p.getCollaborator());
			data.put("username", username);
			data.put("validator",validator.getId().toString());
			data.put("description", p.getDescription());
			data.put("RequestDate", p.getRequestDate());
			data.put("TypeOfTime", p.getTypeOfTime());
			data.put("balanceUsed", p.getBalanceUsed());
			data.put("statut", p.getStatut());
			data.put("Type", "PAID");
			data.put("RequestDates", p.getDatesRequest());
			System.out.println("Process started successfully");
			 runtimeService.startProcessInstanceByKey("EverHoliday", String.valueOf(p.getId()), data).getId();
			
			 return p;
		}else if(type=="UnPAID") {
			
			UnpaidRequest p=unpaidTransfromer.entityTranferFromDTO( unpaidRequestService.createPaidRequest(unpaidTransfromer.entityTranferToDTO((UnpaidRequest) PaidRequest)));
			String username = p.getCollaborator().getUsername();
			CollaboratorDTO validator = OrganizationalUintService.findValidator(collaboratorTransformer.entityTranferToDTO( PaidRequest.getCollaborator()));
			
			Map<String, Object> data = new HashMap<String, Object>() ;
			data.put("paidRequest", p);
			data.put("id", p.getId());
			data.put("Owner", p.getCollaborator());
			data.put("username", username);
			data.put("validator",validator.getId().toString());
			data.put("description", p.getDescription());
			data.put("RequestDate", p.getRequestDate());
			data.put("TypeOfTime", p.getTypeOfTime());
			data.put("Type", "UnPAID");
			data.put("statut", p.getStatut());
			data.put("RequestDates", p.getDatesRequest());
			System.out.println("Process started successfully");
			 runtimeService.startProcessInstanceByKey("EverHoliday", String.valueOf(p.getId()), data).getId();
			
			 return p;
		}else if(type=="EXEPTIONEL") {
			ExeptionnelRequestDTO Paid = exeptionnelTransformer.entityTranferToDTO((ExeptionnelRequest) PaidRequest);
			ExeptionnelRequest p=exeptionnelTransformer.entityTranferFromDTO(exeptionnelRequestService.createPaidRequest( Paid));
			String username = p.getCollaborator().getUsername();
			CollaboratorDTO validator = OrganizationalUintService.findValidator(Paid.getCollaborator());
			
			Map<String, Object> data = new HashMap<String, Object>() ;
			data.put("paidRequest", p);
			data.put("id", p.getId());
			data.put("Owner", p.getCollaborator());
			data.put("username", username);
			data.put("validator",validator.getId().toString());
			data.put("description", p.getDescription());
			data.put("RequestDate", p.getRequestDate());
			data.put("TypeOfTime", p.getTypeOfTime());
			data.put("statut", p.getStatut());
			data.put("Type", "EXEPTIONEL");
			data.put("RequestDates", p.getDatesRequest());
			System.out.println("Process started successfully");
			 runtimeService.startProcessInstanceByKey("EverHoliday", String.valueOf(p.getId()), data).getId();
			
			 return p;
		}else if(type=="RECOVERY") {
			RecoveryRequestDTO paid=recoveryRequestService.createPaidRequest(recoveryTransformer.entityTranferToDTO((RecoveryRequest) PaidRequest));
			RecoveryRequest p = recoveryTransformer.entityTranferFromDTO(paid);
			String username = p.getCollaborator().getUsername();
			CollaboratorDTO validator = OrganizationalUintService.findValidator(paid.getCollaborator());
			
			Map<String, Object> data = new HashMap<String, Object>() ;
			data.put("paidRequest", p);
			data.put("id", p.getId());
			data.put("Owner", p.getCollaborator());
			data.put("username", username);
			data.put("validator",validator.getId().toString());
			data.put("description", p.getDescription());
			data.put("RequestDate", p.getRequestDate());
			data.put("TypeOfTime", p.getTypeOfTime());
			data.put("statut", p.getStatut());
			data.put("RequestDates", p.getDatesRequest());
			System.out.println("Process started successfully");
			 runtimeService.startProcessInstanceByKey("EverHoliday", String.valueOf(p.getId()), data).getId();
			
			 return p;
		}else {
			PaidRequestDTO paid=paidRequestService.createPaidRequest(paidTransformer.entityTranferToDTO((PaidRequest) PaidRequest));
			PaidRequest p = paidTransformer.entityTranferFromDTO(paid);
			String username = p.getCollaborator().getUsername();
			CollaboratorDTO validator = OrganizationalUintService.findValidator(paid.getCollaborator());
			
			Map<String, Object> data = new HashMap<String, Object>() ;
			data.put("paidRequest", p);
			data.put("id", p.getId());
			data.put("Owner", p.getCollaborator());
			data.put("username", username);
			data.put("validator",validator.getId().toString());
			data.put("description", p.getDescription());
			data.put("RequestDate", p.getRequestDate());
			data.put("TypeOfTime", p.getTypeOfTime());
			data.put("balanceUsed", p.getBalanceUsed());
			data.put("Type", "PAID");
			data.put("statut", p.getStatut());
			data.put("RequestDates", p.getDatesRequest());
			System.out.println("Process started successfully");
			 runtimeService.startProcessInstanceByKey("EverHoliday", String.valueOf(p.getId()), data).getId();
			
			 return p;

		}
		 
		 
		
	    }
	

    public void sendMailOwner(VacacionRequest PaidRequest) {
        CollaboratorDTO validator = OrganizationalUintService.findValidator(collaboratorTransformer.entityTranferToDTO(PaidRequest.getCollaborator()));
        
        EmailService.sendSimpleMessage(PaidRequest.getCollaborator().getEmail(),
                "EverHolday",
                "Bonjour "+PaidRequest.getCollaborator().getFirstname()+" "+PaidRequest.getCollaborator().getLastname()+","
                + " \n Votre demande de Congé payé du date "+PaidRequest.getRequestDate()+" est en attente de validation par : "
                        +validator.getLastname()+" "+validator.getFirstname()
                + " \n Cordialement.");
  
       
    }
    public void sendMailValidator(VacacionRequest PaidRequest,String Type) {
    	if(Type=="PAID") {
    		CollaboratorDTO validator = OrganizationalUintService.findValidator(collaboratorTransformer.entityTranferToDTO(PaidRequest.getCollaborator()));
    	EmailService.sendSimpleMessage(validator.getEmail(),
        		"EverHolday",
        		"Bonjour "+validator.getFirstname()+" "+validator.getLastname()+","
        		+ " \n "+ PaidRequest.getCollaborator().getLastname()+" " +PaidRequest.getCollaborator().getFirstname()+
        		" a demandé une Congé payé dans la "+PaidRequest.getRequestDate() + " est en attente de votre validation "
        		+ " \n Cordialement.");
    	}else {
    		ArrayList<CollaboratorDTO> listRH =new ArrayList<CollaboratorDTO>();
            for(OrganizationalUnitDTO unit:OrganizationalUintService.getAll()){
                if(unit.getName().equals("RH")) {
                    listRH.add(unit.getValidator()); 
                    for(CollaboratorDTO col :unit.getCollaborators1()) {
                        listRH.add(col);
                    }
                }
           };
           for(CollaboratorDTO col : listRH) {
               EmailService.sendSimpleMessage(col.getEmail(),
                       "EverHolday",
                       "Bonjour "+col.getFirstname()+" "+col.getLastname()+","
                       + " \n "+ PaidRequest.getCollaborator().getFirstname()+" " +PaidRequest.getCollaborator().getLastname()+
                       "a demandé une Congé "+Type+ " dans la "+PaidRequest.getRequestDate() + " est en attente de votre validation \r\n \n Cordialement.");
                       		      		  
           }
    	}
    	

    }
    public void sendMailRH(VacacionRequest PaidRequest) {
        ArrayList<CollaboratorDTO> listRH =new ArrayList<CollaboratorDTO>();
         for(OrganizationalUnitDTO unit:OrganizationalUintService.getAll()){
             if(unit.getName().equals("RH")) {
                 listRH.add(unit.getValidator()); 
                 for(CollaboratorDTO col :unit.getCollaborators1()) {
                     listRH.add(col);
                 }
             }
        };
        for(CollaboratorDTO col : listRH) {
            CollaboratorDTO validator = OrganizationalUintService.findValidator(collaboratorTransformer.entityTranferToDTO(PaidRequest.getCollaborator()));
            EmailService.sendSimpleMessage(col.getEmail(),
                    "EverHolday",
                    "Bonjour "+col.getFirstname()+" "+col.getLastname()+","
                    + " \n la demande du Congé payé de "+ PaidRequest.getCollaborator().getFirstname()+" " +PaidRequest.getCollaborator().getLastname()+
                    "a était refusé par  "+validator.getFirstname() 
                    +" "+validator.getLastname()
                    + " \n Cordialement.");
        }
        
    }
    public void sendMailValidationOwner(Long id ,String statut) {
        System.out.println("fff");

    	PaidRequestDTO PaidRequest = paidRequestService.getPaidRequestById(id);
    	CollaboratorDTO validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
    	EmailService.sendSimpleMessage(PaidRequest.getCollaborator().getEmail(),
    			"EverHolday",
        		"Bonjour "+PaidRequest.getCollaborator().getFirstname()+" "+PaidRequest.getCollaborator().getLastname()+","
        		+ " \n Votre demande de Congé payé du date "+PaidRequest.getRequestDate()+"  est "+statut +"  par : "
        				+validator.getLastname()+" "+validator.getFirstname()
        		+ " \n Cordialement.");

    }
    public ResponseEntity<PaidRequest> updateStatut( Long id,  String a){
        PaidRequest b = PaidRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
        
        b.setStatut(a);
        PaidRequestDTO updatedUser =paidTransformer.entityTranferToDTO( PaidRequestRepository.save(b));


        CollaboratorDTO validator=OrganizationalUintService.findValidator(updatedUser.getCollaborator());
        
        
        TaskQuery tasks = taskService.createTaskQuery().taskAssignee(validator.getId().toString());
        List<Task> tasks1 = taskService.createTaskQuery().taskAssignee(validator.getId().toString()).list();
        System.out.println(tasks.list());
        for (Task task : tasks1) {
            
            Map<String, Object> taskVariables = new HashMap<String, Object>();
            taskVariables.put("validation", a);
            taskVariables.put("Owner", b.getCollaborator().getLastname()+" "+b.getCollaborator().getFirstname());
            taskService.complete(task.getId(), taskVariables);
             System.out.println("   the data "+taskVariables.toString());
        }

        System.out.println("the statut of "+a);
 

 

        return ResponseEntity.ok(paidTransformer.entityTranferFromDTO(updatedUser));

	}
 
}
 
	

