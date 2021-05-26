package com.example.demo.service;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.Collaborator;
import com.example.demo.model.RecoveryRequest;
import com.example.demo.repository.RecoveryRequestRepository;
@Service
public class RecoveryRequestService {
	@Autowired
	RecoveryRequestRepository RecoveryRequestRepository;

	public Collection<RecoveryRequest> getAll() {
		  return RecoveryRequestRepository.findAll();
	 }		    
	public RecoveryRequest createPaidRequest( RecoveryRequest A) {
		return RecoveryRequestRepository.save(A);
	}
	public ResponseEntity<RecoveryRequest> getPaidRequestById(Long id) {
		RecoveryRequest a = RecoveryRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(a);
	}
	public ResponseEntity<RecoveryRequest> updatePaidRequest( Long id,  RecoveryRequest a){
		RecoveryRequest b = RecoveryRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		RecoveryRequest updatedUser = RecoveryRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}
	public ResponseEntity<Collection<RecoveryRequest>> getPaidRequestByUser(Collaborator id) {
		Collection<RecoveryRequest> a = RecoveryRequestRepository.getbyUser(id);
				
		return ResponseEntity.ok(a);
	}

	public ResponseEntity<Map<String, Boolean>> deletePaidRequest(Long id){
		RecoveryRequest user = RecoveryRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));
		
		RecoveryRequestRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	public ResponseEntity<RecoveryRequest> updateStatut( Long id,  String a){
		RecoveryRequest b = RecoveryRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		b.setStatut(a);
		
		RecoveryRequest updatedUser = RecoveryRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}

}