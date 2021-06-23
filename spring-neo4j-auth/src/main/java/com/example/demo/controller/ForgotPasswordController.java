package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.security.TokenUtil;
import com.example.demo.service.CustomrService;

import com.example.demo.proceessImpl.EmailService;
import com.example.demo.service.CollaborateurService;

import org.springframework.web.bind.annotation.PutMapping;

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
	    
		@PostMapping("/email")
		public boolean SubmitForgot(@RequestBody String email) {
			email = email.replace("%40","@");
			email = email.replace("=","");
		//	int code = CollaborateurService.random_int(100000, 999999);
			if(CollaborateurService.findByEmails(email)){
				Long code =CollaborateurService.CodeValidationAleatoire();
				CollaborateurService.UpdateCodeV(email,code);
				emailService.sendSimpleMessage(email, "forgot password","saisir le code suivant "+ code +" pour changer votre mot de pass ");
				
			};
		return CollaborateurService.findByEmails(email);	
		}
		@PostMapping("/changepass/{code}")
		public boolean SubmitCode(@RequestBody String email,@PathVariable Long code){
		
		
			return CollaborateurService.VerifieCodeV(code, email);
		}
		@PostMapping("/changepass/reset/{password}")
		public void ResetPassword(@PathVariable String password,@RequestBody String email){
		
		
		CollaborateurService.resetpassword(email, password);
		}
		/*@PutMapping("/changepass/{code}")
		public boolean SubmitCode(@RequestBody String email,@PathVariable Long code){
		
		
			return CollaborateurService.VerifieCodeV(code, email);
		}
		
		@GetMapping("/email/{email}")
		public boolean SubmitForgot(@PathVariable String email) {
			
			return  CollaborateurService.findByEmails(email);}

		@PostMapping("/codepin")
		public void SendCode(@RequestBody String email) {
			int code = CollaborateurService.random_int(10000, 99999);
			if(CollaborateurService.findByEmails(email)){
				emailService.sendSimpleMessage(email, "saisir le code suivant"+ code ,"pour changer votre mot de pass ");
			};
			}*/
				
			
			
			
			
			
		
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
