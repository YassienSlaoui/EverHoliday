package com.example.demo.service;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SoldeDTO;
import com.example.demo.model.Solde;
import com.example.demo.repository.SoldeRepository;
import com.example.demo.transformer.SoldeTranformer;
@Service
public class SoldeService {
	@Autowired
	SoldeRepository SoldeRepository;
	
	SoldeTranformer soldeTranformer = new SoldeTranformer();
	public Collection<SoldeDTO> getAll() {
		  return soldeTranformer.entitytransferListToDTO(SoldeRepository.findAll());
	 }		    
	public SoldeDTO createSolde( SoldeDTO A) {
		return soldeTranformer.entityTranferToDTO(SoldeRepository.save(soldeTranformer.entityTranferFromDTO(A)));
	}
	public ResponseEntity<SoldeDTO> getSoldeById(Long id) {
		Solde a = SoldeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(soldeTranformer.entityTranferToDTO(a));
	}
	public ResponseEntity<SoldeDTO> updateSolde( Long id,  SoldeDTO solde){
		Solde a=soldeTranformer.entityTranferFromDTO(solde);
		Solde b = SoldeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		b.setAnnualBalance(a.getAnnualBalance());
		b.setCumulativeBalance(a.getCumulativeBalance());
		b.setRemainder(a.getRemainder());
		
		Solde updatedUser = SoldeRepository.save(b);
		return ResponseEntity.ok(soldeTranformer.entityTranferToDTO(updatedUser));
	}


	public ResponseEntity<Map<String, Boolean>> deleteSolde(Long id){
		
		
		SoldeRepository.delete(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
