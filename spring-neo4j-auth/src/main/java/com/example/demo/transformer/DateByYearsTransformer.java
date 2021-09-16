package com.example.demo.transformer;

import com.example.demo.dto.DateByYearsDTO;
import com.example.demo.model.DateByYears;

public class DateByYearsTransformer extends AbstractTransformer<DateByYears, DateByYearsDTO>{

	@Override
	public DateByYearsDTO entityTranferToDTO(DateByYears entity) {
		DateByYearsDTO dto = new DateByYearsDTO();
		dto.setId(entity.getId());
		dto.setBalance(entity.getBalance());
		dto.setYear(entity.getYear());
		return dto;
	}

	@Override
	public DateByYears entityTranferFromDTO(DateByYearsDTO dto) {
		DateByYears entity = new DateByYears();
		entity.setId(dto.getId());
		entity.setBalance(dto.getBalance());
		entity.setYear(dto.getYear());
		return entity;
	}
 
}
