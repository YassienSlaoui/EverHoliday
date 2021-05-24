package com.example.demo.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.Collaborator;
import com.example.demo.model.PaidRequest;
import com.example.demo.repository.PaidRequestRepository;


@Service
public class PaidRequestService {
	@Autowired
	PaidRequestRepository PaidRequestRepository;

	public Collection<PaidRequest> getAll() {
		  return PaidRequestRepository.findAll();
	 }		    
	public PaidRequest createPaidRequest( PaidRequest A) {
		return PaidRequestRepository.save(A);
	}
	public PaidRequest getPaidRequestById(Long id) {
		PaidRequest a = PaidRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		return a;
	}
	public ResponseEntity<PaidRequest> updatePaidRequest( Long id,  PaidRequest a){
		PaidRequest b = PaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		PaidRequest updatedUser = PaidRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}
	public ResponseEntity<Collection<PaidRequest>> getPaidRequestByUser(Collaborator id) {
		Collection<PaidRequest> a = PaidRequestRepository.getbyUser(id);
				
		return ResponseEntity.ok(a);
	}

	public ResponseEntity<Map<String, Boolean>> deletePaidRequest(Long id){
		PaidRequest user = PaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));
		
		PaidRequestRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	public ResponseEntity<PaidRequest> updateStatut( Long id,  String a){
		PaidRequest b = PaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		b.setStatut(a);
		
		PaidRequest updatedUser = PaidRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}

}
