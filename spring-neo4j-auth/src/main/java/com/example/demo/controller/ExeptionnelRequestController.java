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
	import com.example.demo.model.TypeOfVaction;
	
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
	    @GetMapping("/ExeptionnelRequest/typeofVaction")
	    public Collection<TypeOfVaction> getAllType() {
	    	
	        return ExeptionnelRequestService.getAllType();
	    }
	    
		
		@PostMapping("/ExeptionnelRequest")
		public ExeptionnelRequest adduser(@RequestBody ExeptionnelRequest PaidRequest) {
			
			return ExeptionnelRequestService.createPaidRequest(PaidRequest);
			
		}
		@PostMapping("/ExeptionnelRequest/typeofVaction")
		public TypeOfVaction addType(@RequestBody TypeOfVaction typeOfVaction) {
			
			return ExeptionnelRequestService.createTypeOfVacation(typeOfVaction);
			
		}
		
		@GetMapping("/ExeptionnelRequest/{id}")
		public ResponseEntity<ExeptionnelRequest> getEmployeeById(@PathVariable Long id) {
			
			return ExeptionnelRequestService.getPaidRequestById(id);
		}
		@GetMapping("/ExeptionnelRequest/typeofVaction/{id}")
		public ResponseEntity<TypeOfVaction> getTypeOfVacationtById(@PathVariable Long id) {
			
			return ExeptionnelRequestService.getTypeOfVacationtById(id);
		}
		
		
		@PutMapping("/ExeptionnelRequest/{id}")
		public ResponseEntity<ExeptionnelRequest> updateEmployee(@PathVariable Long id, @RequestBody ExeptionnelRequest user){
			return ExeptionnelRequestService.updatePaidRequest(id,user);
		}
		@PutMapping("/ExeptionnelRequest/typeofVaction/{id}")
		public ResponseEntity<TypeOfVaction> updateEmployee(@PathVariable Long id, @RequestBody TypeOfVaction user){
			return ExeptionnelRequestService.updateTypeOfVacation(id,user);
		}
		@GetMapping("/ExeptionnelRequest/users")
		public ResponseEntity<Collection<ExeptionnelRequest>> getPaidRequestByUser( @RequestBody Collaborator user){
			return ExeptionnelRequestService.getPaidRequestByUser(user);
		}
		@DeleteMapping("/ExeptionnelRequest/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			
			return ExeptionnelRequestService.deletePaidRequest(id);
		}
		@DeleteMapping("/ExeptionnelRequest/typeofVaction/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteTypeOfVacation(@PathVariable Long id){
			
			return ExeptionnelRequestService.deleteTypeOfVacation(id);
		}
		@PutMapping("/ExeptionnelRequest/statut/{id}")
		public ResponseEntity<ExeptionnelRequest> updateStatut(@PathVariable Long id, @RequestBody ExeptionnelRequest user){
			
			return ExeptionnelRequestService.updateStatut(id,user.getStatut());
		}
	
}
