package com.example.demo.proceessImpl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.Collaborator;
import com.example.demo.model.OrganizationalUnit;
import com.example.demo.model.PaidRequest;
import com.example.demo.repository.PaidRequestRepository;
import com.example.demo.service.OrganizationalUintService;
import org.activiti.engine.TaskService;

@Service
public class ActivitiProcess {
	@Autowired
	private PaidRequestRepository PaidRequestRepository;
	   @Autowired
	  private  RuntimeService runtimeService;
	   @Autowired
		private OrganizationalUintService OrganizationalUintService;
	   @Autowired
		private EmailService EmailService;
	   @Autowired
	   private TaskService taskService;
	 public ActivitiProcess() {
		} 
	public void startProcess(PaidRequest PaidRequest) {
		String username = PaidRequest.getCollaborator().getUsername();
		Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
		Map<String, Object> data = new HashMap<String, Object>() ;
		data.put("Owner", PaidRequest.getCollaborator());
		data.put("username", username);
		data.put("validator",validator);
		data.put("description", PaidRequest.getDescription());
		data.put("RequestDate", PaidRequest.getRequestDate());
		data.put("TypeOfTime", PaidRequest.getTypeOfTime());
		data.put("balanceUsed", PaidRequest.getBalanceUsed());
		data.put("statut", PaidRequest.getStatut());
		data.put("RequestDates", PaidRequest.getDatesRequest());
		  runtimeService.startProcessInstanceByKey("HolidayProcess", String.valueOf(PaidRequest.getId()), data);
	    }
	
    public void sendMailOwner(PaidRequest PaidRequest) {
    	Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
    	
        EmailService.sendSimpleMessage(PaidRequest.getCollaborator().getEmail(),
        		"EverHolday",
        		"Bonjour "+PaidRequest.getCollaborator().getLastname()+" "+PaidRequest.getCollaborator().getLastname()+","
        		+ " \n Votre demande de Congé payé du date "+PaidRequest.getRequestDate()+" est en attente de validation par : "
        				+validator.getLastname()+" "+validator.getFirstname()
        		+ " \n Cordialement.");
       
    }
    public void sendMailValidator(PaidRequest PaidRequest) {
    	Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
    	EmailService.sendSimpleMessage(validator.getEmail(),
        		"EverHolday",
        		"Bonjour "+validator.getLastname()+" "+validator.getLastname()+","
        		+ " \n "+ PaidRequest.getCollaborator().getLastname()+" " +PaidRequest.getCollaborator().getLastname()+
        		"a demandé une Congé payé dans la "+PaidRequest.getRequestDate() + " est en attente de votre validation "
        		+ " \n Cordialement.");
    }
    public void sendMailRH(PaidRequest PaidRequest) {
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
            		"Bonjour "+col.getLastname()+" "+col.getLastname()+","
            		+ " \n la demande du Congé payé de "+ PaidRequest.getCollaborator().getLastname()+" " +PaidRequest.getCollaborator().getLastname()+
            		"a était refusé par  "+validator.getFirstname() 
            		+" "+validator.getLastname()
            		+ " \n Cordialement.");
    	}
    	
    }
    public void sendMailValidationOwner(PaidRequest PaidRequest ,String statut) {
    	Collaborator validator = OrganizationalUintService.findValidator(PaidRequest.getCollaborator());
    	EmailService.sendSimpleMessage(validator.getEmail(),
    			"EverHolday",
        		"Bonjour "+PaidRequest.getCollaborator().getLastname()+" "+PaidRequest.getCollaborator().getLastname()+","
        		+ " \n Votre demande de Congé payé du date "+PaidRequest.getRequestDate()+" sera "+statut +"  par : "
        				+validator.getLastname()+" "+validator.getFirstname()
        		+ " \n Cordialement.");
    }
    public ResponseEntity<PaidRequest> updateStatut( Long id,  String a){
		PaidRequest b = PaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		b.setStatut(a);
		
		PaidRequest updatedUser = PaidRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
		/*List<Task> tasks = taskService.createTaskQuery()
                .taskDefinitionKey(id+" "+a)
                .processInstanceBusinessKey(String.valueOf(id))
                .list();

        for (Task task : tasks) {
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("validation", a);
            data.put("Owner",a);
            taskService.complete(task.getId(), data);
        }*/
	}
}
