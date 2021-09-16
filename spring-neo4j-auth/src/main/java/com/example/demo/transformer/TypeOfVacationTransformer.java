package com.example.demo.transformer;

import com.example.demo.dto.TypeOfVactionDTO;
import com.example.demo.model.TypeOfVaction;

public class TypeOfVacationTransformer extends AbstractTransformer<TypeOfVaction, TypeOfVactionDTO>{

	@Override
	public TypeOfVactionDTO entityTranferToDTO(TypeOfVaction entity) {
		TypeOfVactionDTO dto =new TypeOfVactionDTO();
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		dto.setDuration(entity.getDuration());
		return dto;
	}

	@Override
	public TypeOfVaction entityTranferFromDTO(TypeOfVactionDTO dto) {
		TypeOfVaction entity =new TypeOfVaction();
		entity.setId(dto.getId());
		entity.setName(dto.getName());
		entity.setDuration(dto.getDuration());
		return entity;
	}

}
