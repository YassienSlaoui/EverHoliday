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
import com.example.demo.dto.UnpaidRequestDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.PaidRequest;
import com.example.demo.model.UnpaidRequest;
import com.example.demo.proceessImpl.ActivitiProcess;
import com.example.demo.service.PaidRequestService;
import com.example.demo.service.UnpaidRequestService;

@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class UnpaidRequestController {
	@Autowired
    UnpaidRequestService UnpaidRequestService;
    
	@Autowired
	private ActivitiProcess activitiProcess;

    @GetMapping("/UnpaidRequest")
    public Collection<UnpaidRequestDTO> getAll() {
    	
        return UnpaidRequestService.getAll();
    }
    
	
	@PostMapping("/UnpaidRequest")
	public UnpaidRequestDTO adduser(@RequestBody UnpaidRequestDTO PaidRequest) {
		
		return UnpaidRequestService.addPaid(PaidRequest);
		
	}
	
	
	@GetMapping("/UnpaidRequest/{id}")
	public ResponseEntity<UnpaidRequestDTO> getEmployeeById(@PathVariable Long id) {
		
		return UnpaidRequestService.getPaidRequestById(id);
	}
	
	
	
	@PutMapping("/UnpaidRequest/{id}")
	public ResponseEntity<UnpaidRequestDTO> updateEmployee(@PathVariable Long id, @RequestBody UnpaidRequestDTO user){
		return UnpaidRequestService.updatePaidRequest(id,user);
	}
	@GetMapping("/UnpaidRequest/users")
	public ResponseEntity<Collection<UnpaidRequestDTO>> getPaidRequestByUser( @RequestBody CollaboratorDTO user){
		return UnpaidRequestService.getPaidRequestByUser(user);
	}
	@DeleteMapping("/UnpaidRequest/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		
		return UnpaidRequestService.deletePaidRequest(id);
	}
	@PutMapping("/UnpaidRequest/statut/{id}")
	public ResponseEntity<UnpaidRequestDTO> updateStatut(@PathVariable Long id, @RequestBody UnpaidRequestDTO user){
		UnpaidRequestService.updatejustif(id, user.getJustification());
		return UnpaidRequestService.updateStatut(id,user.getStatut());
	}
}