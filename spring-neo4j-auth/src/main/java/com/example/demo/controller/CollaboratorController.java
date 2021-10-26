package com.example.demo.controller;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.example.demo.dto.DateByYearsDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.service.CollaborateurService;
@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class CollaboratorController{

	    @Autowired
	    CollaborateurService CollaborateurService;
	    /*
	    @Scheduled(fixedRate = 60000)
		public void reportCurrentTime() {
	    	CollaborateurService.UpdateRealation();
	    	System.out.println("OK");
		}*/
		@Scheduled(cron="0 0 0 1 1/1 *")
			public void annuelBalanceIncrease() {
			Collection<CollaboratorDTO> cols = getAll();
			for (CollaboratorDTO col :cols) {
				col.getSolde().setAnnualBalance(col.getSolde().getAnnualBalance()+col.getSolde().getRemainder());
				updateEmployee(  col.getId(),   col);
			}
			}
		@Scheduled(cron="0 0 0 1 1 *")
			public void balanceByYearsAdd() {
			Collection<CollaboratorDTO> cols = getAll();
			for (CollaboratorDTO col :cols) {
				DateByYearsDTO dateByYearsDTO = new DateByYearsDTO(LocalDate.now().getYear(),col.getSolde().getAnnualBalance());
				col.getSolde().getCumulativeBances().add(dateByYearsDTO);
				col.getSolde().setAnnualBalance(col.getSolde().getRemainder());
				updateEmployee(  col.getId(),   col);
			}
			
		}	
		
	    /**
	     * create Collaborator 
	     * use BCrypt in password
	     * 
	     * 
	     * 
	     * 
	     * **/
	    
	    @Bean
		  private PasswordEncoder passwordEncoder1() {
		      return new BCryptPasswordEncoder();
		  }

	    @GetMapping("/collaborator")
	    public Collection<CollaboratorDTO> getAll() {
	    	
	        return CollaborateurService.getAll();
	    }
	    
		
		@PostMapping("/collaborator")
		public CollaboratorDTO adduser(@RequestBody CollaboratorDTO Collaborator) {
			return CollaborateurService.createEmployee(Collaborator);
		}
		
		@GetMapping("/collaborator/findbyname/{username}")
		public boolean getEmployeeByUsername(@PathVariable String username) {
			
			return CollaborateurService.findByUserName(username);
		}
		
		@GetMapping("/collaborator/email/{email}")
		public boolean getEmployeeByEmail(@PathVariable String email) {
			return CollaborateurService.findByEmails(email);
		}

		@GetMapping("/collaborator/{id}")
		public ResponseEntity<CollaboratorDTO> getEmployeeById(@PathVariable Long id) {
			return CollaborateurService.getEmployeeById(id);
		}
		
		
		@PutMapping("/collaborator/{id}")
		public ResponseEntity<CollaboratorDTO> updateEmployee(@PathVariable Long id, @RequestBody CollaboratorDTO user){
			
			return CollaborateurService.updateEmployee(id,user);
		}
		@PutMapping("/collaborator/password/{id}")
		public ResponseEntity<CollaboratorDTO> updatePassword(@PathVariable Long id, @RequestBody CollaboratorDTO user){
			return CollaborateurService.updatepassword(id,user.getPassword());
		}
		
		@DeleteMapping("/collaborator/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			
			return CollaborateurService.deleteEmployee(id);
		}
		
		
	}
