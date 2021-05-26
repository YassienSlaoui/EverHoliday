package com.example.demo.controller;
import java.util.Collection;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;

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
import com.example.demo.model.Collaborator;
import com.example.demo.service.CollaborateurService;
@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class CollaboratorController {

	    @Autowired
	    CollaborateurService CollaborateurService;
	    /*
	    @Scheduled(fixedRate = 60000)
		public void reportCurrentTime() {
	    	CollaborateurService.UpdateRealation();
	    	System.out.println("OK");
		}
		@Scheduled(cron="0 0 0 1 1/1 *")
			public void doSomething() {
			    // something that should execute on 1st day every month @ 00:00
			}
		@Scheduled(cron="0 0 0 1 1 *")
			public void doSomething() {
			    // something that should execute on 1st day every month @ 00:00
			}	
		*/
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
	    public Collection<Collaborator> getAll() {
	    	
	        return CollaborateurService.getAll();
	    }
	    
		
		@PostMapping("/collaborator")
		public Collaborator adduser(@RequestBody Collaborator Collaborator) {
			return CollaborateurService.createEmployee(Collaborator);
		}
		
		@GetMapping("/collaborator/findbyname/{username}")
		public boolean getEmployeeByUsername(@PathVariable String username) {
			
			return CollaborateurService.findByUserName(username);
		}

		@GetMapping("/collaborator/{id}")
		public ResponseEntity<Collaborator> getEmployeeById(@PathVariable Long id) {
			return CollaborateurService.getEmployeeById(id);
		}
		
		
		
		@PutMapping("/collaborator/{id}")
		public ResponseEntity<Collaborator> updateEmployee(@PathVariable Long id, @RequestBody Collaborator user){
			
			return CollaborateurService.updateEmployee(id,user);
		}
		@PutMapping("/collaborator/password/{id}")
		public ResponseEntity<Collaborator> updatePassword(@PathVariable Long id, @RequestBody Collaborator user){
			System.out.println(user);
			return CollaborateurService.updatepassword(id,user.getPassword());
		}
		
		@DeleteMapping("/collaborator/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			
			return CollaborateurService.deleteEmployee(id);
		}
		
		
		/*
		@PostMapping("/collaborator/login")
		public ResponseEntity<Collaborator> login(@RequestBody LoginRequest login){
			
			return CollaborateurService.login(login.getUsername(),login.getPassword());
		}*/
		
	   
		
	}
