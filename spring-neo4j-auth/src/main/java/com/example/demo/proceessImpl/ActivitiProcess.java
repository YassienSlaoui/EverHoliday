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
import com.example.demo.model.*;
import com.example.demo.model.UnpaidRequest;
import com.example.demo.model.VacacionRequest;
import com.example.demo.repository.PaidRequestRepository;
import com.example.demo.service.NotificationService;
import com.example.demo.service.OrganizationalUintService;
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
			PaidRequest p=paidRequestService.createPaidRequest((PaidRequest) PaidRequest);
			String username = p.getCollaborator().getUsername();
			Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
			
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
			UnpaidRequest p=unpaidRequestService.createPaidRequest((UnpaidRequest) PaidRequest);
			String username = p.getCollaborator().getUsername();
			Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
			
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
			ExeptionnelRequest p=exeptionnelRequestService.createPaidRequest((ExeptionnelRequest) PaidRequest);
			String username = p.getCollaborator().getUsername();
			Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
			
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
			RecoveryRequest p=recoveryRequestService.createPaidRequest((RecoveryRequest) PaidRequest);
			String username = p.getCollaborator().getUsername();
			Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
			
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
			PaidRequest p=paidRequestService.createPaidRequest((PaidRequest) PaidRequest);
			String username = p.getCollaborator().getUsername();
			Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
			
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
        Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
        
        EmailService.sendSimpleMessage(PaidRequest.getCollaborator().getEmail(),
                "EverHolday",
                "Bonjour "+PaidRequest.getCollaborator().getFirstname()+" "+PaidRequest.getCollaborator().getLastname()+","
                + " \n Votre demande de Congé payé du date "+PaidRequest.getRequestDate()+" est en attente de validation par : "
                        +validator.getLastname()+" "+validator.getFirstname()
                + " \n Cordialement.");
  
       
    }
    public void sendMailValidator(VacacionRequest PaidRequest,String Type) {
    	if(Type=="PAID") {
    		Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
    	EmailService.sendSimpleMessage(validator.getEmail(),
        		"EverHolday",
        		"Bonjour "+validator.getFirstname()+" "+validator.getLastname()+","
        		+ " \n "+ PaidRequest.getCollaborator().getLastname()+" " +PaidRequest.getCollaborator().getFirstname()+
        		" a demandé une Congé payé dans la "+PaidRequest.getRequestDate() + " est en attente de votre validation "
        		+ " \n Cordialement.");
    	}else {
    		ArrayList<Collaborator> listRH =new ArrayList<Collaborator>();
            for(OrganizationalUnit unit:OrganizationalUintService.getAll()){
                if(unit.getName().equals("RH")) {
                    listRH.add(unit.getValidator()); 
                    for(Collaborator col :unit.getCollaborators1()) {
                        listRH.add(col);
                    }
                }
           };
           for(Collaborator col : listRH) {
               EmailService.sendSimpleMessage(col.getEmail(),
                       "EverHolday",
                       "Bonjour "+col.getFirstname()+" "+col.getLastname()+","
                       + " \n "+ PaidRequest.getCollaborator().getFirstname()+" " +PaidRequest.getCollaborator().getLastname()+
                       "a demandé une Congé "+Type+ " dans la "+PaidRequest.getRequestDate() + " est en attente de votre validation \r\n \n Cordialement.");
                       		      		  
           }
    	}
    	

    }
    public void sendMailRH(VacacionRequest PaidRequest) {
        ArrayList<Collaborator> listRH =new ArrayList<Collaborator>();
         for(OrganizationalUnit unit:OrganizationalUintService.getAll()){
             if(unit.getName().equals("RH")) {
                 listRH.add(unit.getValidator()); 
                 for(Collaborator col :unit.getCollaborators1()) {
                     listRH.add(col);
                 }
             }
        };
        for(Collaborator col : listRH) {
            Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
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

    	PaidRequest PaidRequest = paidRequestService.getPaidRequestById(id);
    	Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
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
        PaidRequest updatedUser = PaidRequestRepository.save(b);


        Collaborator validator=OrganizationalUintService.findValidator(b.getCollaborator());
        
        
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
 

 

        return ResponseEntity.ok(updatedUser);

	}
 
}
 
	

