package com.example.demo.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.Collaborator;
import com.example.demo.model.ExeptionnelRequest;
import com.example.demo.model.TypeOfVaction;
import com.example.demo.repository.ExeptionnelRequestRepository;
import com.example.demo.repository.TypeOfVacationRepository;
@Service
public class ExeptionnelRequestService {
	@Autowired
	private ExeptionnelRequestRepository ExeptionnelRequestRepository;
	@Autowired
	private TypeOfVacationRepository typeOfVacationRepository;
	public Collection<ExeptionnelRequest> getAll() {
		  return ExeptionnelRequestRepository.findAll();
	 }
	public Collection<TypeOfVaction> getAllType() {
		  return typeOfVacationRepository.findAll();
	 }
	public ExeptionnelRequest createPaidRequest( ExeptionnelRequest A) {
		return ExeptionnelRequestRepository.save(A);
	}
	public TypeOfVaction createTypeOfVacation( TypeOfVaction A) {
		return typeOfVacationRepository.save(A);
	}
	public ResponseEntity<ExeptionnelRequest> getPaidRequestById(Long id) {
		ExeptionnelRequest a = ExeptionnelRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(a);
	}
	public ResponseEntity<TypeOfVaction> getTypeOfVacationtById(Long id) {
		TypeOfVaction a = typeOfVacationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(a);
	}
	public ResponseEntity<ExeptionnelRequest> updatePaidRequest( Long id,  ExeptionnelRequest a){
		ExeptionnelRequest b = ExeptionnelRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		ExeptionnelRequest updatedUser = ExeptionnelRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}
	public ResponseEntity<TypeOfVaction> updateTypeOfVacation( Long id,  TypeOfVaction a){
		TypeOfVaction b = typeOfVacationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		TypeOfVaction updatedUser = typeOfVacationRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}
	public ResponseEntity<Collection<ExeptionnelRequest>> getPaidRequestByUser(Collaborator id) {
		Collection<ExeptionnelRequest> a = ExeptionnelRequestRepository.getbyUser(id);
				
		return ResponseEntity.ok(a);
	}

	public ResponseEntity<Map<String, Boolean>> deleteTypeOfVacation(Long id){
		TypeOfVaction user = typeOfVacationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));
		
		typeOfVacationRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	public ResponseEntity<Map<String, Boolean>> deletePaidRequest(Long id){
		ExeptionnelRequest user = ExeptionnelRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));
		
		ExeptionnelRequestRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	public ResponseEntity<ExeptionnelRequest> updateStatut( Long id,  String a){
		ExeptionnelRequest b = ExeptionnelRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		b.setStatut(a);
		
		ExeptionnelRequest updatedUser = ExeptionnelRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}
}
