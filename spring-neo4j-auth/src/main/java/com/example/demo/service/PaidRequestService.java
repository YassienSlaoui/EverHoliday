package com.example.demo.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.dto.PaidRequestDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.PaidRequest;
import com.example.demo.proceessImpl.ActivitiProcess;
import com.example.demo.repository.PaidRequestRepository;
import com.example.demo.transformer.CollaboratorTransformer;
import com.example.demo.transformer.PaidTransformer;


@Service
public class PaidRequestService {
	@Autowired
	PaidRequestRepository PaidRequestRepository;
	
	PaidTransformer paidTransformer=new PaidTransformer();
	
	CollaboratorTransformer collaboratorTransformer=new CollaboratorTransformer();
	@Autowired
	private ActivitiProcess activitiProcess;
	public Collection<PaidRequestDTO> getAll() {
		  return paidTransformer.entitytransferListToDTO(PaidRequestRepository.findAll());
	 }		    
	public PaidRequestDTO createPaidRequest( PaidRequestDTO A) {
		return paidTransformer.entityTranferToDTO(PaidRequestRepository.save(paidTransformer.entityTranferFromDTO(A)));
	}
	public PaidRequestDTO getPaidRequestById(Long id) {
		PaidRequest a = PaidRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		return paidTransformer.entityTranferToDTO(a);
	}
	public ResponseEntity<PaidRequestDTO> updatePaidRequest( Long id,  PaidRequestDTO paid){
		System.out.println(paid);
		PaidRequest a = paidTransformer.entityTranferFromDTO(paid);
		PaidRequest b = PaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		PaidRequest updatedUser = PaidRequestRepository.save(b);
		return ResponseEntity.ok(paidTransformer.entityTranferToDTO(updatedUser));
	}
	public ResponseEntity<Collection<PaidRequestDTO>> getPaidRequestByUser(CollaboratorDTO col) {
		Collaborator id =collaboratorTransformer.entityTranferFromDTO(col);
		Collection<PaidRequest> a = PaidRequestRepository.getbyUser(id);
				
		return ResponseEntity.ok(paidTransformer.entitytransferListToDTO((List<PaidRequest>) a));
	}

	public ResponseEntity<Map<String, Boolean>> deletePaidRequest(Long id){
		PaidRequestRepository.deleteAll(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	public ResponseEntity<PaidRequestDTO> updateStatut( Long id,  String a){
		PaidRequest b = PaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		b.setStatut(a);
		
		PaidRequest updatedUser = PaidRequestRepository.save(b);
		return ResponseEntity.ok(paidTransformer.entityTranferToDTO(updatedUser));
	}
	public void updatejustif( Long id,  String a){
		PaidRequest b = PaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		
		b.setJustification(a);
		
		 PaidRequestRepository.save(b);
	
	}
	public PaidRequestDTO addPaid(PaidRequestDTO paid) {
		PaidRequest PaidRequest = paidTransformer.entityTranferFromDTO(paid);
		return paidTransformer.entityTranferToDTO( (PaidRequest) activitiProcess.startProcess(PaidRequest,"PAID"));
	}
	public PaidRequestDTO updateStatut( Long id,  PaidRequestDTO request){
		updatejustif(id, request.getJustification());
       return paidTransformer.entityTranferToDTO(activitiProcess.updateStatut(id, request.getStatut()).getBody());
       

	}
}
