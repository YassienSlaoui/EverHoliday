package com.example.demo.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.dto.OrganizationalUnitDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.OrganizationalUnit;
import com.example.demo.repository.OrganizationalUnitRepository;
import com.example.demo.transformer.UnitTransfomer;

@Service
public class OrganizationalUintService {

	@Autowired
	OrganizationalUnitRepository OrganizationalUnitRepository;
	 
	UnitTransfomer unitTransfomer = new UnitTransfomer();
	public Collection<OrganizationalUnitDTO> getAll() {
        return unitTransfomer.entitytransferListToDTO(OrganizationalUnitRepository.findAll());
    }
	public OrganizationalUnitDTO createUnit( OrganizationalUnitDTO Holiday) {
		OrganizationalUnit unit = unitTransfomer.entityTranferFromDTO(Holiday);
		return unitTransfomer.entityTranferToDTO(OrganizationalUnitRepository.save(unit));
	}
	public ResponseEntity<OrganizationalUnitDTO> getUnitById(Long id) {
		OrganizationalUnit a = OrganizationalUnitRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(unitTransfomer.entityTranferToDTO(a));
	}
	public ResponseEntity<OrganizationalUnitDTO> updateUnit( Long id,  OrganizationalUnitDTO unit){
		OrganizationalUnit a =unitTransfomer.entityTranferFromDTO(unit);
		OrganizationalUnit b = OrganizationalUnitRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		b.setName(a.getName());
		b.setValidator(a.getValidator());
		b.setCollaborators(a.getCollaborators1());
		OrganizationalUnit updatedUser = OrganizationalUnitRepository.save(b);
		return ResponseEntity.ok(unitTransfomer.entityTranferToDTO(updatedUser));
	}
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(Long id){
		OrganizationalUnit user = OrganizationalUnitRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));
		
		OrganizationalUnitRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	public int checkValidator(CollaboratorDTO validator){
		int x = 0; 
	
		for (OrganizationalUnitDTO unit : getAll()) {
			
			if (unit.getValidator().getId()==validator.getId()) {
				x=1;
			}
		}
		return x ;
	}
	public boolean checkRH(CollaboratorDTO collaborator){
		boolean x = false; 
	
		for (OrganizationalUnitDTO unit : getAll()) {
			
			if (unit.getName().equals("RH")) {
				
				for(CollaboratorDTO col : unit.getCollaborators1()) {
					if(col.getId()==collaborator.getId()) {
						x=true;
					}
				}
				
			}
		}
		return x ;
	}
	public CollaboratorDTO findValidator(CollaboratorDTO collaborator){
		CollaboratorDTO x = null; 
	
		for (OrganizationalUnitDTO unit : getAll()) {
			for (CollaboratorDTO collaborators :unit.getCollaborators1()) {
				if(collaborators.getId().equals(collaborator.getId())) {
					x=unit.getValidator();break;				}
//				if(collaborators.equals(collaborator)) {
//					x=unit.getValidator();
//					break;
//				}
			}
		}
		System.out.println("the validator is : "+x.getFirstname() +" "+ x.getLastname());
		return x ;
	}
	public Collection<CollaboratorDTO> CollaboratorSolde(Long validator){
		Collection<CollaboratorDTO> A=new ArrayList<CollaboratorDTO>();
	
		for (OrganizationalUnitDTO unit : getAll()) {
			
			if (unit.getValidator().getId()==validator) {
				A.addAll(unit.getCollaborators1());
			}
		}
		Collection<CollaboratorDTO> newList = new ArrayList<CollaboratorDTO>();
		  
        
        for (CollaboratorDTO element : A) {
  
           
            if (!newList.contains(element)) {
  
                newList.add(element);
            }
        }
  
        // return the new list
        return newList;
	
	}
	
	public Collection<CollaboratorDTO> CollaboratorUnit(Long validator){
		Collection<CollaboratorDTO> A=new ArrayList<CollaboratorDTO>();
		
		for (OrganizationalUnitDTO unit : getAll()) {
			
			if (unit.getValidator().getId()==validator) {
				A.addAll(unit.getCollaborators1());
				A.add(unit.getValidator());
			}
		}
		for (OrganizationalUnitDTO unit : getAll()) {
			for (CollaboratorDTO collaborator : unit.getCollaborators1()) {
			if (collaborator.getId()==validator) {
				A.addAll(unit.getCollaborators1());
				A.add(unit.getValidator());
			}
		}}
		Collection<CollaboratorDTO> newList = new ArrayList<CollaboratorDTO>();
		  
        
        for (CollaboratorDTO element : A) {
  
           
            if (!newList.contains(element)) {
  
                newList.add(element);
            }
        }
  
        // return the new list
        return newList;
	
	}
}
