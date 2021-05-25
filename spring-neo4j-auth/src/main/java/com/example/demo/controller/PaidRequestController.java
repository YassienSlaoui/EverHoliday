package com.example.demo.controller;

import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Collaborator;
import com.example.demo.model.PaidRequest;
import com.example.demo.proceessImpl.ActivitiProcess;
import com.example.demo.service.PaidRequestService;

@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class PaidRequestController {
	@Autowired
    PaidRequestService PaidRequestService;
    
	@Autowired
	private ActivitiProcess activitiProcess;

    @GetMapping("/PaidRequest")
    public Collection<PaidRequest> getAll() {
    	
        return PaidRequestService.getAll();
    }
    
	
	@PostMapping("/PaidRequest")
	public PaidRequest adduser(@RequestBody PaidRequest PaidRequest) {
		 return activitiProcess.startProcess(PaidRequest);
		//return PaidRequestService.createPaidRequest(PaidRequest);
		
		
	}
	
	
	@GetMapping("/PaidRequest/{id}")
	public PaidRequest getEmployeeById(@PathVariable Long id) {
		
		return PaidRequestService.getPaidRequestById(id);
	}
	
	
	
	@PutMapping("/PaidRequest/{id}")
	public ResponseEntity<PaidRequest> updateEmployee(@PathVariable Long id, @RequestBody PaidRequest user){
		
		return PaidRequestService.updatePaidRequest(id,user);
	}
	@GetMapping("/PaidRequest/users")
	public ResponseEntity<Collection<PaidRequest>> getPaidRequestByUser( @RequestBody Collaborator user){
		return PaidRequestService.getPaidRequestByUser(user);
	}
	@DeleteMapping("/PaidRequest/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		
		return PaidRequestService.deletePaidRequest(id);
	}
	@PutMapping("/PaidRequest/statut/{id}")
	public ResponseEntity<PaidRequest> updateStatut(@PathVariable Long id, @RequestBody PaidRequest request){
		activitiProcess.updateStatut(id, request.getStatut());
		return PaidRequestService.updateStatut(id,request.getStatut());
	}
}
