package com.example.demo.transformer;

import com.example.demo.dto.DatesRequestDTO;
import com.example.demo.model.DatesRequest;

public class DateRequestTransformer extends AbstractTransformer<DatesRequest, DatesRequestDTO> {

	@Override
	public DatesRequestDTO entityTranferToDTO(DatesRequest entity) {
		DatesRequestDTO dto = new DatesRequestDTO();
		dto.setId(entity.getId());
		dto.setEndDate(entity.getEndDate());
		dto.setDuration(entity.getDuration());
		dto.setStartDate(entity.getStartDate());
		return dto;
	}

	@Override
	public DatesRequest entityTranferFromDTO(DatesRequestDTO dto) {
		DatesRequest entity = new DatesRequest();
		entity.setId(dto.getId());
		entity.setEndDate(dto.getEndDate());
		entity.setDuration(dto.getDuration());
		entity.setStartDate(dto.getStartDate());
		return entity;
	}

}
