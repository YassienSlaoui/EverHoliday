package com.example.demo.transformer;

import com.example.demo.dto.HolidayDTO;
import com.example.demo.model.Holiday;

public class HolidayTransfromer extends AbstractTransformer<Holiday, HolidayDTO> {

	@Override
	public HolidayDTO entityTranferToDTO(Holiday entity) {
		HolidayDTO dto =new HolidayDTO();
		dto.setId(entity.getId());
		dto.setDate(entity.getDate());
		dto.setName(entity.getName());
		dto.setCountry(entity.getCountry());
		dto.setDuration(entity.getDuration());
		return dto;
	}

	@Override
	public Holiday entityTranferFromDTO(HolidayDTO dto) {
		Holiday entity =new Holiday();
		entity.setId(dto.getId());
		entity.setDate(dto.getDate());
		entity.setName(dto.getName());
		entity.setDuration(dto.getDuration());
		entity.setCountry(dto.getCountry());
		return entity;
	}

}
