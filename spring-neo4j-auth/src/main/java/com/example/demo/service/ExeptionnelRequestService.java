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
import com.example.demo.dto.ExeptionnelRequestDTO;
import com.example.demo.dto.TypeOfVactionDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.ExeptionnelRequest;
import com.example.demo.model.TypeOfVaction;
import com.example.demo.model.UnpaidRequest;
import com.example.demo.repository.ExeptionnelRequestRepository;
import com.example.demo.repository.TypeOfVacationRepository;
import com.example.demo.transformer.CollaboratorTransformer;
import com.example.demo.transformer.ExeptionnelTransformer;
import com.example.demo.transformer.TypeOfVacationTransformer;

@Service
public class ExeptionnelRequestService {
	@Autowired
	private ExeptionnelRequestRepository ExeptionnelRequestRepository;
	
	private CollaboratorTransformer collaboratorTransformer = new CollaboratorTransformer();
	@Autowired
	private TypeOfVacationRepository typeOfVacationRepository;
	
	private ExeptionnelTransformer exeptionnelTransformer=new ExeptionnelTransformer();
	
	private TypeOfVacationTransformer typeOfVacationTransformer =new TypeOfVacationTransformer();

	public Collection<ExeptionnelRequestDTO> getAll() {
		return exeptionnelTransformer.entitytransferListToDTO(ExeptionnelRequestRepository.findAll());
	}

	public Collection<TypeOfVactionDTO> getAllType() {
		return typeOfVacationTransformer.entitytransferListToDTO(typeOfVacationRepository.findAll());
	}

	public ExeptionnelRequestDTO createPaidRequest(ExeptionnelRequestDTO A) {
		ExeptionnelRequest exptionnel = exeptionnelTransformer.entityTranferFromDTO(A);
		return exeptionnelTransformer.entityTranferToDTO(ExeptionnelRequestRepository.save(exptionnel));
	}

	public TypeOfVactionDTO createTypeOfVacation(TypeOfVactionDTO A) {
		TypeOfVaction typeOfVaction =typeOfVacationTransformer.entityTranferFromDTO(A);
		return typeOfVacationTransformer.entityTranferToDTO(typeOfVacationRepository.save(typeOfVaction));
	}

	public ResponseEntity<ExeptionnelRequestDTO> getPaidRequestById(Long id) {
		ExeptionnelRequest a = ExeptionnelRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(exeptionnelTransformer.entityTranferToDTO(a));
	}

	public ResponseEntity<TypeOfVactionDTO> getTypeOfVacationtById(Long id) {
		TypeOfVaction a = typeOfVacationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(typeOfVacationTransformer.entityTranferToDTO(a));
	}

	public ResponseEntity<ExeptionnelRequestDTO> updatePaidRequest(Long id, ExeptionnelRequestDTO exeptionnelRequest) {
		ExeptionnelRequest a = exeptionnelTransformer.entityTranferFromDTO(exeptionnelRequest);
		ExeptionnelRequest b = ExeptionnelRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		ExeptionnelRequest updatedUser = ExeptionnelRequestRepository.save(b);
		return ResponseEntity.ok(exeptionnelTransformer.entityTranferToDTO(updatedUser));
	}

	public ResponseEntity<TypeOfVactionDTO> updateTypeOfVacation(Long id, TypeOfVactionDTO typeOfVaction) {
		TypeOfVaction a = typeOfVacationTransformer.entityTranferFromDTO(typeOfVaction);
		TypeOfVaction b = typeOfVacationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		TypeOfVaction updatedUser = typeOfVacationRepository.save(b);
		return ResponseEntity.ok(typeOfVacationTransformer.entityTranferToDTO(updatedUser));
	}

	public ResponseEntity<Collection<ExeptionnelRequestDTO>> getPaidRequestByUser(CollaboratorDTO dto) {
		Collaborator id = collaboratorTransformer.entityTranferFromDTO(dto);
		Collection<ExeptionnelRequest> a = ExeptionnelRequestRepository.getbyUser(id);
		return ResponseEntity.ok(exeptionnelTransformer.entitytransferListToDTO((List<ExeptionnelRequest>) a));
	}

	public ResponseEntity<Map<String, Boolean>> deleteTypeOfVacation(Long id) {
		TypeOfVaction user = typeOfVacationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));

		typeOfVacationRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	public ResponseEntity<Map<String, Boolean>> deletePaidRequest(Long id) {
		ExeptionnelRequest user = ExeptionnelRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));

		ExeptionnelRequestRepository.deleteAll(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	public ResponseEntity<ExeptionnelRequestDTO> updateStatut(Long id, String a) {
		ExeptionnelRequest b = ExeptionnelRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		b.setStatut(a);

		ExeptionnelRequest updatedUser = ExeptionnelRequestRepository.save(b);
		return ResponseEntity.ok(exeptionnelTransformer.entityTranferToDTO(updatedUser));
	}

	public void updatejustif(Long id, String a) {
		ExeptionnelRequest b = ExeptionnelRequestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		b.setJustification(a);

		ExeptionnelRequestRepository.save(b);

	}
}
