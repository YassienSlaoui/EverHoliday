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
import com.example.demo.dto.PaidRequestDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.PaidRequest;
import com.example.demo.proceessImpl.ActivitiProcess;
import com.example.demo.service.PaidRequestService;

@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class PaidRequestController{
	@Autowired
    PaidRequestService PaidRequestService;
    
	@Autowired
	private ActivitiProcess activitiProcess;
	
	

    @GetMapping("/PaidRequest")
    public Collection<PaidRequestDTO> getAll() {
    	
        return PaidRequestService.getAll();
    }
    
	
	@PostMapping("/PaidRequest")
	public PaidRequestDTO adduser(@RequestBody PaidRequestDTO PaidRequest) {
		 return PaidRequestService.addPaid(PaidRequest);

	}
	
	
	@GetMapping("/PaidRequest/{id}")
	public PaidRequestDTO getEmployeeById(@PathVariable Long id) {
		
		return PaidRequestService.getPaidRequestById(id);
	}
	
	
	
	@PutMapping("/PaidRequest/{id}")
	public ResponseEntity<PaidRequestDTO> updateEmployee(@PathVariable Long id, @RequestBody PaidRequestDTO user){
		
		return PaidRequestService.updatePaidRequest(id,user);
	}
	@GetMapping("/PaidRequest/users")
	public ResponseEntity<Collection<PaidRequestDTO>> getPaidRequestByUser( @RequestBody CollaboratorDTO user){
		return PaidRequestService.getPaidRequestByUser(user);
	}
	@DeleteMapping("/PaidRequest/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		
		return PaidRequestService.deletePaidRequest(id);
	}
	@PutMapping("/PaidRequest/statut/{id}")
	public PaidRequestDTO updateStatut(@PathVariable Long id, @RequestBody PaidRequestDTO request){
		
       return PaidRequestService.updateStatut(id, request);
       

	}
}