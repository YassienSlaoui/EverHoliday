package com.example.demo.transformer;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.PaidRequestDTO;
import com.example.demo.model.PaidRequest;

public class PaidTransformer extends AbstractTransformer<PaidRequest, PaidRequestDTO>{
	
	private CollaboratorTransformer collaboratorTransformer =new CollaboratorTransformer();
	
	private DateRequestTransformer dateRequestTransformer =new DateRequestTransformer();
	@Override
	public PaidRequestDTO entityTranferToDTO(PaidRequest entity) {
		PaidRequestDTO dto = new PaidRequestDTO();
		dto.setId(entity.getId());
		dto.setBalanceUsed(entity.getBalanceUsed());
		dto.setDescription(entity.getDescription());
		dto.setJustification(entity.getJustification());
		dto.setStatut(entity.getStatut());
		dto.setCollaborator(collaboratorTransformer.entityTranferToDTO(entity.getCollaborator()));
		dto.setDatesRequest(dateRequestTransformer.entitytransferListToDTO(entity.getDatesRequest()));
		dto.setTypeOfTime(entity.getTypeOfTime());
		dto.setRequestDate(entity.getRequestDate());
		return dto;
	}

	@Override
	public PaidRequest entityTranferFromDTO(PaidRequestDTO dto) {
		PaidRequest entity = new PaidRequest();
		entity.setId(dto.getId());
		entity.setBalanceUsed(dto.getBalanceUsed());
		entity.setDescription(dto.getDescription());
		entity.setJustification(dto.getJustification());
		entity.setStatut(dto.getStatut());
		entity.setCollaborator(collaboratorTransformer.entityTranferFromDTO(dto.getCollaborator()));
		entity.setDatesRequest(dateRequestTransformer.entitytransferListFromDTO(dto.getDatesRequest()));
		entity.setTypeOfTime(dto.getTypeOfTime());
		entity.setRequestDate(dto.getRequestDate());
		return entity;
	}

}
