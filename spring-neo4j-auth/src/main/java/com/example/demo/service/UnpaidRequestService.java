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
import com.example.demo.model.UnpaidRequest;
import com.example.demo.repository.PaidRequestRepository;
import com.example.demo.repository.UnpaidRequestRepository;


@Service
public class UnpaidRequestService {
	@Autowired
	UnpaidRequestRepository UnpaidRequestRepository;

	public Collection<UnpaidRequest> getAll() {
		  return UnpaidRequestRepository.findAll();
	 }		    
	public UnpaidRequest createPaidRequest( UnpaidRequest A) {
		return UnpaidRequestRepository.save(A);
	}
	public ResponseEntity<UnpaidRequest> getPaidRequestById(Long id) {
		UnpaidRequest a = UnpaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(a);
	}
	public ResponseEntity<UnpaidRequest> updatePaidRequest( Long id,  UnpaidRequest a){
		UnpaidRequest b = UnpaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		UnpaidRequest updatedUser = UnpaidRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}
	public ResponseEntity<Collection<UnpaidRequest>> getPaidRequestByUser(Collaborator id) {
		Collection<UnpaidRequest> a = UnpaidRequestRepository.getbyUser(id);
				
		return ResponseEntity.ok(a);
	}

	public ResponseEntity<Map<String, Boolean>> deletePaidRequest(Long id){
		UnpaidRequest user = UnpaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));
		
		UnpaidRequestRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	public ResponseEntity<UnpaidRequest> updateStatut( Long id,  String a){
		UnpaidRequest b = UnpaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		b.setStatut(a);
		
		UnpaidRequest updatedUser = UnpaidRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}

}

