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
import com.example.demo.model.RecoveryRequest;
import com.example.demo.service.PaidRequestService;
import com.example.demo.service.RecoveryRequestService;

@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class RecoveryRequestController {
	@Autowired
    RecoveryRequestService RecoveryRequestService;
    
    

    @GetMapping("/RecoveryRequest")
    public Collection<RecoveryRequest> getAll() {
    	
        return RecoveryRequestService.getAll();
    }
    
	
	@PostMapping("/RecoveryRequest")
	public RecoveryRequest adduser(@RequestBody RecoveryRequest PaidRequest) {
		
		return RecoveryRequestService.createPaidRequest(PaidRequest);
		
	}
	
	
	@GetMapping("/RecoveryRequest/{id}")
	public ResponseEntity<RecoveryRequest> getEmployeeById(@PathVariable Long id) {
		
		return RecoveryRequestService.getPaidRequestById(id);
	}
	
	
	
	@PutMapping("/RecoveryRequest/{id}")
	public ResponseEntity<RecoveryRequest> updateEmployee(@PathVariable Long id, @RequestBody RecoveryRequest user){
		return RecoveryRequestService.updatePaidRequest(id,user);
	}
	@GetMapping("/RecoveryRequest/users")
	public ResponseEntity<Collection<RecoveryRequest>> getPaidRequestByUser( @RequestBody Collaborator user){
		return RecoveryRequestService.getPaidRequestByUser(user);
	}
	@DeleteMapping("/RecoveryRequest/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		
		return RecoveryRequestService.deletePaidRequest(id);
	}
	@PutMapping("/RecoveryRequest/statut/{id}")
	public ResponseEntity<RecoveryRequest> updateStatut(@PathVariable Long id, @RequestBody PaidRequest user){
		
		return RecoveryRequestService.updateStatut(id,user.getStatut());
	}
}