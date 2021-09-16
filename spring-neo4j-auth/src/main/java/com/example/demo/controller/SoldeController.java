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

import com.example.demo.dto.SoldeDTO;
import com.example.demo.model.Solde;
import com.example.demo.service.SoldeService;
@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class SoldeController {
	 @Autowired
	    SoldeService SoldeService;
	   
	    @GetMapping("/Solde")
	    public Collection<SoldeDTO> getAll() {
	    	
	        return SoldeService.getAll();
	    }
	    
		
		@PostMapping("/Solde")
		public SoldeDTO addSolde (@RequestBody SoldeDTO Solde) {
			
			return SoldeService.createSolde(Solde);
		}
		
		
		@GetMapping("/Solde/{id}")
		public ResponseEntity<SoldeDTO> getSoldeById(@PathVariable Long id) {
			
			return SoldeService.getSoldeById(id);
		}
		
		
		
		@PutMapping("/Solde/{id}")
		public ResponseEntity<SoldeDTO> updateSolde(@PathVariable Long id, @RequestBody SoldeDTO Solde){
			return SoldeService.updateSolde(id,Solde);
		}
		
		@DeleteMapping("/Solde/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteSolde(@PathVariable Long id){
			
			return SoldeService.deleteSolde(id);
		}
	

		   
}
