package com.example.demo.transformer;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.UnpaidRequestDTO;
import com.example.demo.model.UnpaidRequest;

public class UnpaidTransfromer extends AbstractTransformer<UnpaidRequest, UnpaidRequestDTO>{
	
	private CollaboratorTransformer collaboratorTransformer =new CollaboratorTransformer();
	
	private DateRequestTransformer dateRequestTransformer=new DateRequestTransformer();
	@Override
	public UnpaidRequestDTO entityTranferToDTO(UnpaidRequest entity) {
		UnpaidRequestDTO dto = new UnpaidRequestDTO();
		dto.setId(entity.getId());
		dto.setDescription(entity.getDescription());
		dto.setJustification(entity.getJustification());
		dto.setStatut(entity.getStatut());
		dto.setCollaborator(collaboratorTransformer.entityTranferToDTO(entity.getCollaborator()));
		dto.setDatesRequest(dateRequestTransformer.entitytransferListToDTO(entity.getDatesRequest()));
		dto.setTypeOfTime(entity.getTypeOfTime());
		dto.setTotalDays(entity.getTotalDays());
		dto.setRequestDate(entity.getRequestDate());
		return dto;
		
	}

	@Override
	public UnpaidRequest entityTranferFromDTO(UnpaidRequestDTO dto) {
		UnpaidRequest entity =new UnpaidRequest();
		entity.setId(dto.getId());
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
