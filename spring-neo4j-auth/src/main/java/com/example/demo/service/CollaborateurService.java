package com.example.demo.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.model.Collaborator;
import com.example.demo.repository.CollaborateurRepository;
import com.example.demo.transformer.CollaboratorTransformer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import com.example.demo.proceessImpl.EmailService;

@Service
public class CollaborateurService {

	@Autowired
	CollaborateurRepository CollaborateurRepository;
	
	CollaboratorTransformer collaboratorTransformer =new CollaboratorTransformer();
	@Autowired
	private EmailService EmailService;

	public Collection<CollaboratorDTO> getAll() {
		return collaboratorTransformer.entitytransferListToDTO(CollaborateurRepository.findAll()) ;
	}

	public CollaboratorDTO createEmployee(CollaboratorDTO A) {
		Collaborator collaborator = collaboratorTransformer.entityTranferFromDTO(A);
		collaborator.setPassword("{bcrypt}" + passwordEncoder5().encode(A.getPassword()));
		return collaboratorTransformer.entityTranferToDTO(CollaborateurRepository.save(collaborator));
	}

	public boolean findByUserName(String username) {
		if (CollaborateurRepository.logins(username) != null) {
			System.out.println(" " + CollaborateurRepository.logins(username).getId());
			return true;
		} else {
			return false;
		}
	}

	public boolean findByEmails(String email) {
		System.out.println(CollaborateurRepository.findByEmail(email));
		email = email.replace("%40", "@");
		email = email.replace("=", "");
		if (CollaborateurRepository.findByEmail(email) != null) {
			System.out.println(" " + CollaborateurRepository.findByEmail(email).getId());
			return true;
		} else {
			return false;
		}
	}

	public CollaboratorDTO findByEmail(String email) {
		return collaboratorTransformer.entityTranferToDTO(CollaborateurRepository.findByEmail(email));
	}

	public ResponseEntity<CollaboratorDTO> getEmployeeById(Long id) {
		Collaborator a = CollaborateurRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		
		return ResponseEntity.ok(collaboratorTransformer.entityTranferToDTO(a));
	}

	public ResponseEntity<CollaboratorDTO> updateEmployee(Long id, CollaboratorDTO collaborator) {
		Collaborator a= collaboratorTransformer.entityTranferFromDTO(collaborator);
		Collaborator b = CollaborateurRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		b.setAdresse(a.getAdresse());
		b.setFirstname(a.getFirstname());
		b.setLastname(a.getLastname());
		// b.setPassword("{bcrypt}"+passwordEncoder5().encode(a.getPassword()));
		b.setUsername(a.getUsername());
		b.setCountry(a.getCountry());
		b.setSolde(a.getSolde());
		b.setEmail(a.getEmail());
		b.setBirthday(a.getBirthday());
		
		b.setExperience(a.getExperience());
		Collaborator updatedUser = CollaborateurRepository.save(b);
		return ResponseEntity.ok(collaboratorTransformer.entityTranferToDTO(updatedUser));
	}

	public ResponseEntity<CollaboratorDTO> updatepassword(Long id, String a) {
		Collaborator b = CollaborateurRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));

		b.setPassword("{bcrypt}" + passwordEncoder5().encode(a));

		Collaborator updatedUser = CollaborateurRepository.save(b);
		return ResponseEntity.ok(collaboratorTransformer.entityTranferToDTO(updatedUser));
	}

	public ResponseEntity<Map<String, Boolean>> deleteEmployee(Long id) {
		Collaborator user = CollaborateurRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));

		CollaborateurRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	@Bean
	private PasswordEncoder passwordEncoder5() {
		return new BCryptPasswordEncoder();
	}

	public void updateResetPasswordToken(String token, String email) {
		Collaborator customer = CollaborateurRepository.findByEmail(email);
		if (customer != null) {
			customer.setResetPasswordToken(token);
			CollaborateurRepository.save(customer);
		}
	}

	public CollaboratorDTO getByResetPasswordToken(String token) {
		return collaboratorTransformer.entityTranferToDTO(CollaborateurRepository.findByResetPasswordToken(token));
	}

	public void updatePassword(CollaboratorDTO collaborato, String newPassword) {
		Collaborator customer =collaboratorTransformer.entityTranferFromDTO(collaborato);
		customer.setPassword("{bcrypt}" + passwordEncoder5().encode(newPassword));
		customer.setResetPasswordToken(null);
		CollaborateurRepository.save(customer);
	}

	public static int random_int(int Min, int Max) {
		return (int) (Math.random() * (Max - Min)) + Min;
	}

	public long CodeValidationAleatoire() {

		return random_int(10000, 99999);
	}

	public void UpdateCodeV(String email, Long Code) {

		Collaborator customer = CollaborateurRepository.findByEmail(email);
		if (customer != null) {
			Collaborator customer1 = CollaborateurRepository.findById(customer.getId())
					.orElseThrow(() -> new ResourceNotFoundException("not exist with id :"));
			customer1.setCodeValidation(Code);
			CollaborateurRepository.save(customer1);

		}
	}

	public boolean VerifieCodeV(long code, String email) {
		// System.out.println(email);
		email = email.replace("%40", "@");
		email = email.replace("=", "");
		Collaborator a = CollaborateurRepository.findByEmail(email);
		// System.out.println("fff"+a.getCodeValidation());
		if (a.getCodeValidation().equals(code)) {
			return true;
		} else {
			return false;
		}

	}

	public void resetpassword(String email, String password) {
		email = email.replace("%40", "@");
		email = email.replace("=", "");

		Collaborator b = CollaborateurRepository.findByEmail(email);
		Collaborator customer1 = CollaborateurRepository.findById(b.getId())
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :"));
		customer1.setPassword("{bcrypt}" + passwordEncoder5().encode(password));

		CollaborateurRepository.save(customer1);

	}

}
