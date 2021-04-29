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
import com.example.demo.model.UnpaidRequest;
import com.example.demo.service.PaidRequestService;
import com.example.demo.service.UnpaidRequestService;

@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class UnpaidRequestController {
	@Autowired
    UnpaidRequestService UnpaidRequestService;
    
    

    @GetMapping("/UnpaidRequest")
    public Collection<UnpaidRequest> getAll() {
    	
        return UnpaidRequestService.getAll();
    }
    
	
	@PostMapping("/UnpaidRequest")
	public UnpaidRequest adduser(@RequestBody UnpaidRequest PaidRequest) {
		
		return UnpaidRequestService.createPaidRequest(PaidRequest);
		
	}
	
	
	@GetMapping("/UnpaidRequest/{id}")
	public ResponseEntity<UnpaidRequest> getEmployeeById(@PathVariable Long id) {
		
		return UnpaidRequestService.getPaidRequestById(id);
	}
	
	
	
	@PutMapping("/UnpaidRequest/{id}")
	public ResponseEntity<UnpaidRequest> updateEmployee(@PathVariable Long id, @RequestBody UnpaidRequest user){
		return UnpaidRequestService.updatePaidRequest(id,user);
	}
	@GetMapping("/UnpaidRequest/users")
	public ResponseEntity<Collection<UnpaidRequest>> getPaidRequestByUser( @RequestBody Collaborator user){
		return UnpaidRequestService.getPaidRequestByUser(user);
	}
	@DeleteMapping("/UnpaidRequest/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		
		return UnpaidRequestService.deletePaidRequest(id);
	}
	@PutMapping("/UnpaidRequest/statut/{id}")
	public ResponseEntity<UnpaidRequest> updateStatut(@PathVariable Long id, @RequestBody PaidRequest user){
		
		return UnpaidRequestService.updateStatut(id,user.getStatut());
	}
}

