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

	import com.example.demo.model.Collaborator;
import com.example.demo.model.ExeptionnelRequest;
import com.example.demo.model.PaidRequest;
	import com.example.demo.model.UnpaidRequest;
	
	import com.example.demo.service.ExeptionnelRequestService;

	@CrossOrigin(origins = "http://localhost:3000")
	@Component
	@RestController
	@RequestMapping("/rest/neo4j/")
	public class ExeptionnelRequestController {
		@Autowired
		ExeptionnelRequestService ExeptionnelRequestService;
	    
	    

	    @GetMapping("/ExeptionnelRequest")
	    public Collection<ExeptionnelRequest> getAll() {
	    	
	        return ExeptionnelRequestService.getAll();
	    }
	    
		
		@PostMapping("/ExeptionnelRequest")
		public ExeptionnelRequest adduser(@RequestBody ExeptionnelRequest PaidRequest) {
			
			return ExeptionnelRequestService.createPaidRequest(PaidRequest);
			
		}
		
		
		@GetMapping("/ExeptionnelRequest/{id}")
		public ResponseEntity<ExeptionnelRequest> getEmployeeById(@PathVariable Long id) {
			
			return ExeptionnelRequestService.getPaidRequestById(id);
		}
		
		
		
		@PutMapping("/ExeptionnelRequest/{id}")
		public ResponseEntity<ExeptionnelRequest> updateEmployee(@PathVariable Long id, @RequestBody ExeptionnelRequest user){
			return ExeptionnelRequestService.updatePaidRequest(id,user);
		}
		@GetMapping("/ExeptionnelRequest/users")
		public ResponseEntity<Collection<ExeptionnelRequest>> getPaidRequestByUser( @RequestBody Collaborator user){
			return ExeptionnelRequestService.getPaidRequestByUser(user);
		}
		@DeleteMapping("/ExeptionnelRequest/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			
			return ExeptionnelRequestService.deletePaidRequest(id);
		}
		@PutMapping("/ExeptionnelRequest/statut/{id}")
		public ResponseEntity<ExeptionnelRequest> updateStatut(@PathVariable Long id, @RequestBody ExeptionnelRequest user){
			
			return ExeptionnelRequestService.updateStatut(id,user.getStatut());
		}
	
}