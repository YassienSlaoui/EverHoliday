package com.example.demo.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.demo.model.Holiday;
import com.example.demo.model.Solde;
import com.example.demo.repository.HolidayRepository;

@Service
public class HolidayService {
	@Autowired
	HolidayRepository holidayRepository;
	public Collection<Holiday> getAll() {
        return holidayRepository.findAll();
    }
	public Holiday createHoliday( Holiday Holiday) {
		return holidayRepository.save(Holiday);
	}
	public ResponseEntity<Holiday> getHolidayById(Long id) {
		Holiday a = holidayRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(a);
	}
	public ResponseEntity<Holiday> updateHoliday( Long id,  Holiday a){
		Holiday b = holidayRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		b.setName(a.getName());
		b.setDuration(a.getDuration());
		b.setDate(a.getDate());
		Holiday updatedUser = holidayRepository.save(b);
		return ResponseEntity.ok(updatedUser);
	}
	public ResponseEntity<Map<String, Boolean>> deleteSolde(Long id){
		Holiday user = holidayRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist  :" + id));
		
		holidayRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
