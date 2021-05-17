package com.example.demo.proceessImpl;

import java.util.HashMap;
import java.util.Map;

import org.activiti.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Collaborator;
import com.example.demo.model.PaidRequest;
import com.example.demo.service.OrganizationalUintService;

@Service
public class ActivitiProcess {
	   
	   @Autowired
	  private  RuntimeService runtimeService;
	   @Autowired
		 OrganizationalUintService OrganizationalUintService;
	  
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


}
