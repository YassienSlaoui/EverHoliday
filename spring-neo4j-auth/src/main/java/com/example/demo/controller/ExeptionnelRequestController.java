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

import com.example.demo.dto.CollaboratorDTO;
import com.example.demo.dto.ExeptionnelRequestDTO;
import com.example.demo.dto.TypeOfVactionDTO;
import com.example.demo.model.Collaborator;
	import com.example.demo.model.ExeptionnelRequest;
import com.example.demo.model.RecoveryRequest;
import com.example.demo.model.TypeOfVaction;
import com.example.demo.proceessImpl.ActivitiProcess;
import com.example.demo.service.ExeptionnelRequestService;
import com.example.demo.transformer.ExeptionnelTransformer;

	@CrossOrigin(origins = "http://localhost:3000")
	@Component
	@RestController
	@RequestMapping("/rest/neo4j/")
	public class ExeptionnelRequestController {
		@Autowired
		ExeptionnelRequestService ExeptionnelRequestService;
		
		ExeptionnelTransformer exeptionnelTransformer =new ExeptionnelTransformer();
		@Autowired
		private ActivitiProcess activitiProcess;
	    

	    @GetMapping("/ExeptionnelRequest")
	    public Collection<ExeptionnelRequestDTO> getAll() {
	    	
	        return ExeptionnelRequestService.getAll();
	    }
	    @GetMapping("/ExeptionnelRequest/typeofVaction")
	    public Collection<TypeOfVactionDTO> getAllType() {
	    	
	        return ExeptionnelRequestService.getAllType();
	    }
	    
		
		@PostMapping("/ExeptionnelRequest")
		public ExeptionnelRequestDTO adduser(@RequestBody ExeptionnelRequestDTO PaidReques) {
			ExeptionnelRequest PaidRequest = exeptionnelTransformer.entityTranferFromDTO(PaidReques);
			return exeptionnelTransformer.entityTranferToDTO((ExeptionnelRequest) activitiProcess.startProcess(PaidRequest,"EXEPTIONEL"));
			
		}
		@PostMapping("/ExeptionnelRequest/typeofVaction")
		public TypeOfVactionDTO addType(@RequestBody TypeOfVactionDTO typeOfVaction) {
			
			return ExeptionnelRequestService.createTypeOfVacation(typeOfVaction);
			
		}
		
		@GetMapping("/ExeptionnelRequest/{id}")
		public ResponseEntity<ExeptionnelRequestDTO> getEmployeeById(@PathVariable Long id) {
			
			return ExeptionnelRequestService.getPaidRequestById(id);
		}
		@GetMapping("/ExeptionnelRequest/typeofVaction/{id}")
		public ResponseEntity<TypeOfVactionDTO> getTypeOfVacationtById(@PathVariable Long id) {
			
			return ExeptionnelRequestService.getTypeOfVacationtById(id);
		}
		
		
		@PutMapping("/ExeptionnelRequest/{id}")
		public ResponseEntity<ExeptionnelRequestDTO> updateEmployee(@PathVariable Long id, @RequestBody ExeptionnelRequestDTO user){
			return ExeptionnelRequestService.updatePaidRequest(id,user);
		}
		@PutMapping("/ExeptionnelRequest/typeofVaction/{id}")
		public ResponseEntity<TypeOfVactionDTO> updateEmployee(@PathVariable Long id, @RequestBody TypeOfVactionDTO user){
			return ExeptionnelRequestService.updateTypeOfVacation(id,user);
		}
		@GetMapping("/ExeptionnelRequest/users")
		public ResponseEntity<Collection<ExeptionnelRequestDTO>> getPaidRequestByUser( @RequestBody CollaboratorDTO user){
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
		public ResponseEntity<ExeptionnelRequestDTO> updateStatut(@PathVariable Long id, @RequestBody ExeptionnelRequestDTO user){
			ExeptionnelRequestService.updatejustif(id, user.getJustification());
			return ExeptionnelRequestService.updateStatut(id,user.getStatut());
		}
	
}