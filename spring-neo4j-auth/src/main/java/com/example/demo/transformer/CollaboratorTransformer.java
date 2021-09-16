package com.example.demo.transformer;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.dto.OrganizationalUnitDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.OrganizationalUnit;

public class CollaboratorTransformer extends AbstractTransformer<Collaborator, CollaboratorDTO>{
	@Autowired
	private UnitTransfomer unitTransfomer ;
	private SoldeTranformer soldeTranformer = new SoldeTranformer();
	@Override
	public CollaboratorDTO entityTranferToDTO(Collaborator entity) {
		CollaboratorDTO dto = new CollaboratorDTO();
		dto.setAdresse(entity.getAdresse());
		dto.setAge(entity.getAge());
		dto.setCountry(entity.getCountry());
		dto.setEmail(entity.getEmail());
		dto.setExperience(entity.getExperience());
		dto.setFirstname(entity.getFirstname());
		dto.setLastname(entity.getLastname());
		dto.setId(entity.getId());
		dto.setLeaveDate(entity.getLeaveDate());
		dto.setPassword(entity.getPassword());
		if(entity.getSolde()!=null) {
			dto.setSolde(soldeTranformer.entityTranferToDTO(entity.getSolde()));
		}
		
		dto.setStartDate(entity.getStartDate());
		dto.setTeam(entity.getTeam());
		if(entity.getUnit()!=null) {
			dto.setUnit((ArrayList<OrganizationalUnitDTO>) unitTransfomer.entitytransferListToDTO(entity.getUnit()));

		}
		dto.setUsername(entity.getUsername());
		dto.setCin(entity.getCin());
		if(entity.getUnit()!=null) {
		dto.setSup(entityTranferToDTO(entity.getSup()));
		}
		if(entity.getCollaborators()!=null) {
			dto.setCollaborators((ArrayList<CollaboratorDTO>) entitytransferListToDTO(entity.getCollaborators()));
			
		}
		return dto;
	}

	@Override
	public Collaborator entityTranferFromDTO(CollaboratorDTO dto) {
		Collaborator entity = new Collaborator();
		entity.setAdresse(dto.getAdresse());
		entity.setAge(dto.getAge());
		entity.setCountry(dto.getCountry());
		entity.setEmail(dto.getEmail());
		entity.setExperience(dto.getExperience());
		entity.setFirstname(dto.getFirstname());
		entity.setLastname(dto.getLastname());
		entity.setId(dto.getId());
		entity.setLeaveDate(dto.getLeaveDate());
		entity.setPassword(dto.getPassword());
		if(dto.getSolde()!=null) {
			entity.setSolde(soldeTranformer.entityTranferFromDTO(dto.getSolde()));
		}
		entity.setStartDate(dto.getStartDate());
		entity.setTeam(dto.getTeam());
		if(dto.getUnit()!=null) {
		entity.setUnit((ArrayList<OrganizationalUnit>) unitTransfomer.entitytransferListFromDTO(dto.getUnit()));
		}
		entity.setUsername(dto.getUsername());
		entity.setCin(dto.getCin());
		if(dto.getSup()!=null) {
		entity.setSup(entityTranferFromDTO(dto.getSup()));
		}
		if(dto.getCollaborators()!=null) {
		entity.setCollaborators((ArrayList<Collaborator>) entitytransferListFromDTO(dto.getCollaborators()));
		}
		return entity;
	}

}
