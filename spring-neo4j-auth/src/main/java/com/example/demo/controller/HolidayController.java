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
import com.example.demo.model.Holiday;
import com.example.demo.service.HolidayService;
@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping("/rest/neo4j/")
public class HolidayController {

    @Autowired
    HolidayService holidayService;


    @GetMapping("/holiday")
    public Collection<Holiday> getAll() {
        return holidayService.getAll();
    }
    @PostMapping("/holiday")
    public Holiday addHoliday(@RequestBody Holiday holiday) {
    	return holidayService.createHoliday(holiday);
    }
    @GetMapping("/holiday/{id}")
	public ResponseEntity<Holiday> getHolidayById(@PathVariable Long id) {
		
		return holidayService.getHolidayById(id);
	}
	
	
	
	@PutMapping("/holiday/{id}")
	public ResponseEntity<Holiday> updateHoliday(@PathVariable Long id, @RequestBody Holiday Solde){
		return holidayService.updateHoliday(id,Solde);
	}
	@DeleteMapping("/holiday/{id}")
	public ResponseEntity<Map<String, Boolean>> Delete(@PathVariable Long id){
		return holidayService.deleteSolde(id);
	}
    
}
