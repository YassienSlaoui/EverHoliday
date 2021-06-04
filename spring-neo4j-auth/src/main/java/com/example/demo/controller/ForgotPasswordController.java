package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Collaborator;
import com.example.demo.model.JwtResponse;
import com.example.demo.security.SignInRequest;
import com.example.demo.security.TokenUtil;
import com.example.demo.service.CustomrService;
import com.example.demo.service.OrganizationalUintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import com.example.demo.proceessImpl.EmailService;
import com.example.demo.service.CollaborateurService;
import com.example.demo.model.ForgotRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping(value = "/rest/neo4j/forgotpass")
public class ForgotPasswordController {
		@Autowired
	    private TokenUtil tokenUtil;
	    @Autowired
	    private CustomrService CustomrService;
	    @Autowired
	    CollaborateurService CollaborateurService;
	    @Autowired
		private EmailService emailService;
	    
		@GetMapping("/email/{email}")
		public boolean SubmitForgot(@PathVariable String email) {
			
			return  CollaborateurService.findByEmails(email);}

		
				
			
			
			
			
			
		
		/*@PostMapping("/{email}")
		public JwtResponse SubmitFotgot(@PathVariable String email) {
			Collaborator Colaborateur = CustomrService.loadUserByEmail(ForgotRequest.getEmail());
	        String token = tokenUtil.generateToken(Colaborateur);
	        JwtResponse response = new JwtResponse(token);
	        return response;
	        
		}
		@GetMapping("/")
		public boolean getEmployeeByEmail(@PathVariable String email) {
			return CollaborateurService.findByEmails(email);
				
		}
		public void triggerWhenStarted() {
			
		}
		
		/*@PostMapping("/collaborator/forgotpass")
		public long forgot(@RequestBody ForgotRequest forgot) {
			CollaborateurService.ResetPassword(forgot.getEmail());
		}
		
		public void requestToResetPassword(){
			
		}
	*/

}
