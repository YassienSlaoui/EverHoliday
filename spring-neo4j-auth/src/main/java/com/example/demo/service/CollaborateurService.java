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
import com.example.demo.model.Collaborator;
import com.example.demo.repository.CollaborateurRepository;
@Service
public class CollaborateurService {
	
@Autowired
CollaborateurRepository CollaborateurRepository;

public Collection<Collaborator> getAll() {
	  return CollaborateurRepository.findAll();
 }		    
public Collaborator createEmployee( Collaborator A) {
	A.setPassword("{bcrypt}"+passwordEncoder5().encode(A.getPassword()));
	return CollaborateurRepository.save(A);
}
public ResponseEntity<Collaborator> getEmployeeById(Long id) {
	Collaborator a = CollaborateurRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
	return ResponseEntity.ok(a);
}
public ResponseEntity<Collaborator> updateEmployee( Long id,  Collaborator a){
	Collaborator b = CollaborateurRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
	b.setCin(a.getCin());
	b.setTeam(a.getTeam());
	b.setAdresse(a.getAdresse());
	b.setFirstname(a.getFirstname());
	b.setLastname(a.getLastname());
	//b.setPassword("{bcrypt}"+passwordEncoder5().encode(a.getPassword()));
	b.setUsername(a.getUsername());
	b.setCountry(a.getCountry());
	b.setSolde(a.getSolde());
	b.setEmail(a.getEmail());
	b.setBirthday(a.getBirthday());;
	b.setExperience(a.getExperience());
	Collaborator updatedUser = CollaborateurRepository.save(b);
	return ResponseEntity.ok(updatedUser);
}
public ResponseEntity<Collaborator> updatepassword( Long id,  String a){
	Collaborator b = CollaborateurRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
	
	b.setPassword("{bcrypt}"+passwordEncoder5().encode(a));
	
	Collaborator updatedUser = CollaborateurRepository.save(b);
	return ResponseEntity.ok(updatedUser);
}

public ResponseEntity<Map<String, Boolean>> deleteEmployee(Long id){
	Collaborator user = CollaborateurRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));
	
	CollaborateurRepository.delete(user);
	Map<String, Boolean> response = new HashMap<>();
	response.put("deleted", Boolean.TRUE);
	return ResponseEntity.ok(response);
}
/*public void UpdateRealation() {
	CollaborateurRepository.makeRelation();
}*/
@Bean
private PasswordEncoder passwordEncoder5() {
    return new BCryptPasswordEncoder();
}
public void updateResetPasswordToken(String token, String email)  {
	Collaborator customer = CollaborateurRepository.findByEmail(email);
    if (customer != null) {
        customer.setResetPasswordToken(token);
        CollaborateurRepository.save(customer);
    } 
}
 
public Collaborator getByResetPasswordToken(String token) {
    return CollaborateurRepository.findByResetPasswordToken(token);
}
 
public void updatePassword(Collaborator customer, String newPassword) {
    customer.setPassword("{bcrypt}"+passwordEncoder5().encode(newPassword));
    customer.setResetPasswordToken(null);
    CollaborateurRepository.save(customer);
}
	    
}
