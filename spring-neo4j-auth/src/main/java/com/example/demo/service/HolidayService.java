package com.example.demo.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.HolidayDTO;
import com.example.demo.model.Holiday;
import com.example.demo.model.Solde;
import com.example.demo.repository.HolidayRepository;
import com.example.demo.transformer.HolidayTransfromer;

@Service
public class HolidayService {
	@Autowired
	HolidayRepository holidayRepository;
	
	HolidayTransfromer holidayTransfromer =new HolidayTransfromer();
	public Collection<HolidayDTO> getAll() {
        return holidayTransfromer.entitytransferListToDTO(holidayRepository.findAll());
    }
	public HolidayDTO createHoliday( HolidayDTO Holidayd) {
		Holiday Holiday = holidayTransfromer.entityTranferFromDTO(Holidayd);
		return holidayTransfromer.entityTranferToDTO(holidayRepository.save(Holiday));
	}
	public ResponseEntity<HolidayDTO> getHolidayById(Long id) {
		Holiday a = holidayRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(" not exist with id :" + id));
		return ResponseEntity.ok(holidayTransfromer.entityTranferToDTO(a));
	}
	public ResponseEntity<HolidayDTO> updateHoliday( Long id,  HolidayDTO holiday){
		Holiday a = holidayTransfromer.entityTranferFromDTO(holiday);
		Holiday b = holidayRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("not exist with id :" + id));
		b.setName(a.getName());
		b.setDuration(a.getDuration());
		b.setDate(a.getDate());
		Holiday updatedUser = holidayRepository.save(b);
		return ResponseEntity.ok(holidayTransfromer.entityTranferToDTO(updatedUser));
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
