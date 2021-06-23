package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Collaborator;
import com.example.demo.repository.CollaborateurRepository;
@Service
public class CustomrService implements UserDetailsService {

	  @Autowired
	  private CollaborateurRepository CollaborateurRepository;
	  @Autowired
	    private OrganizationalUintService OrganizationalUintService;
	  
	
	  @Bean
	    private PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	  
	  @Override
	  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		  
		  UserDetails user = CollaborateurRepository.login(username);
		  Collaborator user1= CollaborateurRepository.logins(username);
	    /*if (user == null) {
	        throw new UsernameNotFoundException(String.format("Username '%s' not found", username));
	    }
	    if(user1.getTeam().equals("admin RH")) {
        	
        	
	    }else if(OrganizationalUintService.checkValidator(user1) == 1) {
        	System.out.println(OrganizationalUintService.checkValidator(user1));
        	
        }else if(OrganizationalUintService.checkValidator(user1) == 0) {
        	System.out.println(OrganizationalUintService.checkValidator(user1));
        	}
        else {
        	
        }*/
	      return user;
	  }
	 
		 public Collaborator loadUserByEmail(String email) {
			  
		 Collaborator user = CollaborateurRepository.findByEmail(email);
		 return user;
		    
		  }
}
