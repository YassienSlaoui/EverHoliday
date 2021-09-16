package com.example.demo.controller;

import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.dto.OrganizationalUnitDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.model.Holiday;
import com.example.demo.model.OrganizationalUnit;
import com.example.demo.service.OrganizationalUintService;
@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class OrganizatiojnalUnitController {

	
	 @Autowired
	 OrganizationalUintService OrganizationalUintService;
	 @GetMapping("/unit")
	    public Collection<OrganizationalUnitDTO> getAll() {
	        return OrganizationalUintService.getAll();
	    }
	    @PostMapping("/unit")
	    public OrganizationalUnitDTO addHoliday(@RequestBody OrganizationalUnitDTO holiday) {
	    	return OrganizationalUintService.createUnit(holiday);
	    }
	    @GetMapping("/unit/{id}")
		public ResponseEntity<OrganizationalUnitDTO> getHolidayById(@PathVariable Long id) {
			
			return OrganizationalUintService.getUnitById(id);
		}
		
		
		
		@PutMapping("/unit/{id}")
		public ResponseEntity<OrganizationalUnitDTO> updateHoliday(@PathVariable Long id, @RequestBody OrganizationalUnitDTO Solde){
			return OrganizationalUintService.updateUnit(id,Solde);
		}
		@DeleteMapping("/unit/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			
			return OrganizationalUintService.deleteEmployee(id);
		}
		@PostMapping("/unit/check")
		public int check( @RequestBody CollaboratorDTO Solde){
			return OrganizationalUintService.checkValidator(Solde);
		}
		@GetMapping("/unit/solde/{id}")
		public Collection<CollaboratorDTO> solde( @PathVariable Long id){
			return OrganizationalUintService.CollaboratorSolde(id);
		}
		@GetMapping("/unit/team/{id}")
		public Collection<CollaboratorDTO> team( @PathVariable Long id){
			return OrganizationalUintService.CollaboratorUnit(id);
		}
}

