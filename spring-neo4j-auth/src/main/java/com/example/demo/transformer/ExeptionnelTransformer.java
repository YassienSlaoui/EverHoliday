package com.example.demo.transformer;
import com.example.demo.dto.ExeptionnelRequestDTO;
import com.example.demo.model.ExeptionnelRequest;

public class ExeptionnelTransformer extends AbstractTransformer<ExeptionnelRequest, ExeptionnelRequestDTO> {
	
	private CollaboratorTransformer collaboratorTransformer = new CollaboratorTransformer();
	
	private DateRequestTransformer dateRequestTransformer =new DateRequestTransformer();
	
	private TypeOfVacationTransformer typeOfVacationTransformer = new TypeOfVacationTransformer();
	@Override
	public ExeptionnelRequestDTO entityTranferToDTO(ExeptionnelRequest entity) {
		ExeptionnelRequestDTO dto = new ExeptionnelRequestDTO();
		dto.setId(entity.getId());
		dto.setDescription(entity.getDescription());
		dto.setJustification(entity.getJustification());
		dto.setStatut(entity.getStatut());
		dto.setCollaborator(collaboratorTransformer.entityTranferToDTO(entity.getCollaborator()));
		dto.setDatesRequest(dateRequestTransformer.entitytransferListToDTO(entity.getDatesRequest()));
		dto.setTypeOfTime(entity.getTypeOfTime());
		dto.setVacacioType(typeOfVacationTransformer.entityTranferToDTO(entity.getVacacioType()));
		dto.setRequestDate(entity.getRequestDate());
		return dto;
	}

	@Override
	public ExeptionnelRequest entityTranferFromDTO(ExeptionnelRequestDTO dto) {
		ExeptionnelRequest entity = new ExeptionnelRequest();
		entity.setId(dto.getId());
		entity.setDescription(dto.getDescription());
		entity.setJustification(dto.getJustification());
		entity.setStatut(dto.getStatut());
		entity.setCollaborator(collaboratorTransformer.entityTranferFromDTO(dto.getCollaborator()));
		entity.setDatesRequest(dateRequestTransformer.entitytransferListFromDTO(dto.getDatesRequest()));
		entity.setTypeOfTime(dto.getTypeOfTime());
		entity.setRequestDate(dto.getRequestDate());
		entity.setVacacioType(typeOfVacationTransformer.entityTranferFromDTO(dto.getVacacioType()));
		
		return entity;
	}

}
