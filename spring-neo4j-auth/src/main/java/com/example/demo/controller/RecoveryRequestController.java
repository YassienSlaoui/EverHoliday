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

import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.dto.RecoveryRequestDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.RecoveryRequest;
import com.example.demo.model.UnpaidRequest;
import com.example.demo.proceessImpl.ActivitiProcess;
import com.example.demo.service.RecoveryRequestService;

@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class RecoveryRequestController {
	@Autowired
    RecoveryRequestService RecoveryRequestService;
    
	@Autowired
	private ActivitiProcess activitiProcess;

    @GetMapping("/RecoveryRequest")
    public Collection<RecoveryRequestDTO> getAll() {
    	
        return RecoveryRequestService.getAll();
    }
    
	
	@PostMapping("/RecoveryRequest")
	public RecoveryRequestDTO adduser(@RequestBody RecoveryRequestDTO PaidRequest) {
		
		return RecoveryRequestService.addPaid(PaidRequest);
		
	}
	
	
	@GetMapping("/RecoveryRequest/{id}")
	public ResponseEntity<RecoveryRequestDTO> getEmployeeById(@PathVariable Long id) {
		
		return RecoveryRequestService.getPaidRequestById(id);
	}
	
	
	
	@PutMapping("/RecoveryRequest/{id}")
	public ResponseEntity<RecoveryRequest> updateEmployee(@PathVariable Long id, @RequestBody RecoveryRequest user){
		return RecoveryRequestService.updatePaidRequest(id,user);
	}
	@GetMapping("/RecoveryRequest/users")
	public ResponseEntity<Collection<RecoveryRequestDTO>> getPaidRequestByUser( @RequestBody CollaboratorDTO user){
		return RecoveryRequestService.getPaidRequestByUser(user);
	}
	@DeleteMapping("/RecoveryRequest/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		
		return RecoveryRequestService.deletePaidRequest(id);
	}
	@PutMapping("/RecoveryRequest/statut/{id}")
	public ResponseEntity<RecoveryRequestDTO> updateStatut(@PathVariable Long id, @RequestBody RecoveryRequestDTO user){
		RecoveryRequestService.updatejustif(id, user.getJustification());
		return RecoveryRequestService.updateStatut(id,user.getStatut());
	}
}