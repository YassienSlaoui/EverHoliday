package com.example.demo.transformer;

import java.util.ArrayList;


import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.dto.OrganizationalUnitDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.OrganizationalUnit;

public class UnitTransfomer extends AbstractTransformer<OrganizationalUnit, OrganizationalUnitDTO>{
	
	private CollaboratorTransformer collaboratorTransformer =new CollaboratorTransformer();
	@Override
	public OrganizationalUnitDTO entityTranferToDTO(OrganizationalUnit entity) {
		OrganizationalUnitDTO dto = new OrganizationalUnitDTO();
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		dto.setValidator(collaboratorTransformer.entityTranferToDTO(entity.getValidator()));
		dto.setCollaborators((ArrayList<CollaboratorDTO>) collaboratorTransformer.entitytransferListToDTO(entity.getCollaborators1()));
		dto.setCountry(entity.getCountry());
		return dto;
	}

	@Override
	public OrganizationalUnit entityTranferFromDTO(OrganizationalUnitDTO dto) {
		OrganizationalUnit entity = new OrganizationalUnit();
		entity.setId(dto.getId());
		entity.setName(dto.getName());
		entity.setValidator(collaboratorTransformer.entityTranferFromDTO(dto.getValidator()));
		entity.setCollaborators((ArrayList<Collaborator>) collaboratorTransformer.entitytransferListFromDTO(dto.getCollaborators1()));
		entity.setCountry(dto.getCountry());
		return entity;
	}

}
