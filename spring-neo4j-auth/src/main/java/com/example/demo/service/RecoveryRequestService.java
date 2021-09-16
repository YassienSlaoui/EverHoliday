package com.example.demo.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.dto.PaidRequestDTO;
import com.example.demo.dto.RecoveryRequestDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.ExeptionnelRequest;
import com.example.demo.model.PaidRequest;
import com.example.demo.model.RecoveryRequest;
import com.example.demo.proceessImpl.ActivitiProcess;
import com.example.demo.repository.RecoveryRequestRepository;
import com.example.demo.transformer.CollaboratorTransformer;
import com.example.demo.transformer.RecoveryTransformer;

@Service
public class RecoveryRequestService {
	@Autowired
	RecoveryRequestRepository RecoveryRequestRepository;
	RecoveryTransformer recoveryTransformer = new RecoveryTransformer();

	CollaboratorTransformer collaboratorTransformer = new CollaboratorTransformer();
	@Autowired
	private ActivitiProcess activitiProcess;

	public Collection<RecoveryRequestDTO> getAll() {
		return recoveryTransformer.entitytransferListToDTO(RecoveryRequestRepository.findAll());
	}

	public RecoveryRequestDTO createPaidRequest(RecoveryRequestDTO recovery) {
		RecoveryRequest A = recoveryTransformer.entityTranferFromDTO(recovery);
		return recoveryTransformer.entityTranferToDTO(RecoveryRequestRepository.save(A));
	}

	public ResponseEntity<RecoveryRequestDTO> getPaidRequestById(Long id) {
		RecoveryRequest a = RecoveryRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(recoveryTransformer.entityTranferToDTO(a));
	}

	public ResponseEntity<RecoveryRequest> updatePaidRequest(Long id, RecoveryRequest a) {
		RecoveryRequest b = RecoveryRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		RecoveryRequest updatedUser = RecoveryRequestRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}

	public ResponseEntity<Collection<RecoveryRequestDTO>> getPaidRequestByUser(CollaboratorDTO idd) {
		Collaborator id = collaboratorTransformer.entityTranferFromDTO(idd);
		Collection<RecoveryRequest> a = RecoveryRequestRepository.getbyUser(id);

		return ResponseEntity.ok(recoveryTransformer.entitytransferListToDTO((List<RecoveryRequest>) a));
	}

	public ResponseEntity<Map<String, Boolean>> deletePaidRequest(Long id) {
		RecoveryRequest user = RecoveryRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));

		RecoveryRequestRepository.deleteAll(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	public ResponseEntity<RecoveryRequestDTO> updateStatut(Long id, String a) {
		RecoveryRequest b = RecoveryRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		b.setStatut(a);

		RecoveryRequest updatedUser = RecoveryRequestRepository.save(b);
		return ResponseEntity.ok(recoveryTransformer.entityTranferToDTO(updatedUser));
	}

	public void updatejustif(Long id, String a) {
		RecoveryRequest b = RecoveryRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		b.setJustification(a);

		RecoveryRequestRepository.save(b);

	}

	public RecoveryRequestDTO addPaid(RecoveryRequestDTO paid) {
		RecoveryRequest PaidRequest = recoveryTransformer.entityTranferFromDTO(paid);
		return recoveryTransformer
				.entityTranferToDTO((RecoveryRequest) activitiProcess.startProcess(PaidRequest, "RECOVERY"));
	}
}