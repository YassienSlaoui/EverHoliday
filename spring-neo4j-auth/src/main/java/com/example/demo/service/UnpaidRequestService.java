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
import com.example.demo.dto.UnpaidRequestDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.PaidRequest;
import com.example.demo.model.UnpaidRequest;
import com.example.demo.model.VacacionFactory;
import com.example.demo.proceessImpl.ActivitiProcess;
import com.example.demo.repository.UnpaidRequestRepository;
import com.example.demo.transformer.CollaboratorTransformer;
import com.example.demo.transformer.UnpaidTransfromer;

@Service
public class UnpaidRequestService {
	@Autowired
	UnpaidRequestRepository UnpaidRequestRepository;
	
	UnpaidTransfromer unpaidTransfromer = new UnpaidTransfromer();
	
	CollaboratorTransformer collaboratorTransformer =new CollaboratorTransformer();
	@Autowired
	private ActivitiProcess activitiProcess;

	public UnpaidRequestDTO createPaidRequest( UnpaidRequestDTO A) {
		return unpaidTransfromer.entityTranferToDTO(UnpaidRequestRepository.save(unpaidTransfromer.entityTranferFromDTO(A)));
	}
	public Collection<UnpaidRequestDTO> getAll() {
		return unpaidTransfromer.entitytransferListToDTO(UnpaidRequestRepository.findAll());
	}

	public ResponseEntity<UnpaidRequestDTO> getPaidRequestById(Long id) {
		UnpaidRequest a = UnpaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(unpaidTransfromer.entityTranferToDTO(a));
	}

	public ResponseEntity<UnpaidRequestDTO> updatePaidRequest(Long id, UnpaidRequestDTO a) {
		UnpaidRequest b = UnpaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		UnpaidRequest updatedUser = UnpaidRequestRepository.save(b);
		return ResponseEntity.ok(unpaidTransfromer.entityTranferToDTO(updatedUser));
	}

	public ResponseEntity<Collection<UnpaidRequestDTO>> getPaidRequestByUser(CollaboratorDTO id) {
		Collection<UnpaidRequest> a = UnpaidRequestRepository
				.getbyUser(collaboratorTransformer.entityTranferFromDTO(id));

		return ResponseEntity.ok(unpaidTransfromer.entitytransferListToDTO((List<UnpaidRequest>) a));
	}

	public ResponseEntity<Map<String, Boolean>> deletePaidRequest(Long id) {
		UnpaidRequestRepository.deleteAll(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	public ResponseEntity<UnpaidRequestDTO> updateStatut(Long id, String a) {
		UnpaidRequest b = UnpaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		b.setStatut(a);

		UnpaidRequest updatedUser = UnpaidRequestRepository.save(b);
		return ResponseEntity.ok(unpaidTransfromer.entityTranferToDTO(updatedUser));
	}

	public void updatejustif(Long id, String a) {
		UnpaidRequest b = UnpaidRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		b.setJustification(a);

		UnpaidRequestRepository.save(b);

	}

	public UnpaidRequestDTO addPaid(UnpaidRequestDTO paid) {
		UnpaidRequest PaidRequest = unpaidTransfromer.entityTranferFromDTO(paid);
		return unpaidTransfromer.entityTranferToDTO((UnpaidRequest) activitiProcess.startProcess(PaidRequest, "UnPAID"));
	}
}
