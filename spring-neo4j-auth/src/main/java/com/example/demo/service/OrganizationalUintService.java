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

import com.example.demo.model.Collaborator;
import com.example.demo.model.OrganizationalUnit;
import com.example.demo.repository.OrganizationalUnitRepository;

@Service
public class OrganizationalUintService {

	@Autowired
	OrganizationalUnitRepository OrganizationalUnitRepository;
	public Collection<OrganizationalUnit> getAll() {
        return OrganizationalUnitRepository.findAll();
    }
	public OrganizationalUnit createUnit( OrganizationalUnit Holiday) {
		return OrganizationalUnitRepository.save(Holiday);
	}
	public ResponseEntity<OrganizationalUnit> getUnitById(Long id) {
		OrganizationalUnit a = OrganizationalUnitRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(a);
	}
	public ResponseEntity<OrganizationalUnit> updateUnit( Long id,  OrganizationalUnit a){
		OrganizationalUnit b = OrganizationalUnitRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		b.setName(a.getName());
		b.setValidator(a.getValidator());
		b.setCollaborators(a.getCollaborators1());
		OrganizationalUnit updatedUser = OrganizationalUnitRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(Long id){
		OrganizationalUnit user = OrganizationalUnitRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));
		
		OrganizationalUnitRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	public int checkValidator(Collaborator validator){
		int x = 0; 
	
		for (OrganizationalUnit unit : getAll()) {
			
			if (unit.getValidator().getId()==validator.getId()) {
				x=1;
			}
		}
		return x ;
	}
	public Collection<Collaborator> CollaboratorSolde(Long validator){
		Collection<Collaborator> A=new ArrayList<Collaborator>();
	
		for (OrganizationalUnit unit : getAll()) {
			
			if (unit.getValidator().getId()==validator) {
				A.addAll(unit.getCollaborators1());
			}
		}
		Collection<Collaborator> newList = new ArrayList<Collaborator>();
		  
        
        for (Collaborator element : A) {
  
           
            if (!newList.contains(element)) {
  
                newList.add(element);
            }
        }
  
        // return the new list
        return newList;
	
	}
}
