package com.example.demo.transformer;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.RecoveryRequestDTO;
import com.example.demo.model.RecoveryRequest;

public class RecoveryTransformer extends AbstractTransformer<RecoveryRequest, RecoveryRequestDTO> {
	
	private CollaboratorTransformer collaboratorTransformer =new CollaboratorTransformer();
	
	private DateRequestTransformer dateRequestTransformer=new DateRequestTransformer();

	@Override
	public RecoveryRequestDTO entityTranferToDTO(RecoveryRequest entity) {
		RecoveryRequestDTO dto = new RecoveryRequestDTO();
		dto.setId(entity.getId());
		dto.setDescription(entity.getDescription());
		dto.setJustification(entity.getJustification());
		dto.setStatut(entity.getStatut());
		dto.setCollaborator(collaboratorTransformer.entityTranferToDTO(entity.getCollaborator()));
		dto.setDatesRequest(dateRequestTransformer.entitytransferListToDTO(entity.getDatesRequest()));
		dto.setTypeOfTime(entity.getTypeOfTime());
		dto.setTotalDays(entity.getTotalDays());
		dto.setRequestDate(entity.getRequestDate());
		dto.setEndHour(entity.getEndHour());
		dto.setStartHour(entity.getStartHour());
		return dto;
	}

	@Override
	public RecoveryRequest entityTranferFromDTO(RecoveryRequestDTO dto) {
		RecoveryRequest entity = new RecoveryRequest();
		entity.setId(dto.getId());
		entity.setDescription(dto.getDescription());
		entity.setJustification(dto.getJustification());
		entity.setStatut(dto.getStatut());
		entity.setCollaborator(collaboratorTransformer.entityTranferFromDTO(dto.getCollaborator()));
		entity.setDatesRequest(dateRequestTransformer.entitytransferListFromDTO(dto.getDatesRequest()));
		entity.setTypeOfTime(dto.getTypeOfTime());
		entity.setRequestDate(dto.getRequestDate());
		entity.setEndHour(dto.getEndHour());
		entity.setStartHour(dto.getStartHour());
		return entity;
	}

}
