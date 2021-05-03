package com.example.demo.service;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.demo.model.Solde;
import com.example.demo.repository.SoldeRepository;
@Service
public class SoldeService {
	@Autowired
	SoldeRepository SoldeRepository;

	public Collection<Solde> getAll() {
		  return SoldeRepository.findAll();
	 }		    
	public Solde createSolde( Solde A) {
		return SoldeRepository.save(A);
	}
	public ResponseEntity<Solde> getSoldeById(Long id) {
		Solde a = SoldeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(a);
	}
	public ResponseEntity<Solde> updateSolde( Long id,  Solde a){
		Solde b = SoldeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		b.setAnnualBalance(a.getAnnualBalance());
		b.setCumulativeBalance(a.getCumulativeBalance());
		b.setRemainder(a.getRemainder());
		
		Solde updatedUser = SoldeRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}


	public ResponseEntity<Map<String, Boolean>> deleteSolde(Long id){
		
		
		SoldeRepository.delete(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
