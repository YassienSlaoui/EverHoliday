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
	    public Collection<OrganizationalUnit> getAll() {
	        return OrganizationalUintService.getAll();
	    }
	    @PostMapping("/unit")
	    public OrganizationalUnit addHoliday(@RequestBody OrganizationalUnit holiday) {
	    	return OrganizationalUintService.createUnit(holiday);
	    }
	    @GetMapping("/unit/{id}")
		public ResponseEntity<OrganizationalUnit> getHolidayById(@PathVariable Long id) {
			
			return OrganizationalUintService.getUnitById(id);
		}
		
		
		
		@PutMapping("/unit/{id}")
		public ResponseEntity<OrganizationalUnit> updateHoliday(@PathVariable Long id, @RequestBody OrganizationalUnit Solde){
			return OrganizationalUintService.updateUnit(id,Solde);
		}
		@DeleteMapping("/unit/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			
			return OrganizationalUintService.deleteEmployee(id);
		}
		@PostMapping("/unit/check")
		public int check( @RequestBody Collaborator Solde){
			return OrganizationalUintService.checkValidator(Solde);
		}
		@GetMapping("/unit/solde/{id}")
		public Collection<Collaborator> solde( @PathVariable Long id){
			return OrganizationalUintService.CollaboratorSolde(id);
		}
		@GetMapping("/unit/team/{id}")
		public Collection<Collaborator> team( @PathVariable Long id){
			return OrganizationalUintService.CollaboratorUnit(id);
		}
}

