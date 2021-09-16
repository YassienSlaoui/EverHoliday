package com.example.demo.transformer;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public abstract class AbstractTransformer<entity, dto> {
	public abstract dto entityTranferToDTO(entity entity);

	public abstract entity entityTranferFromDTO(dto dto);

	public List<dto> entitytransferListToDTO(List<entity> entitys) {
		List<dto> dto = new ArrayList<dto>();
		for (entity entity : entitys) {
			dto.add(entityTranferToDTO(entity));
		}
		return dto;
	}

	public List<entity> entitytransferListFromDTO(List<dto> dto) {
		List<entity> entities = new ArrayList<>();
		for (dto dtos : dto) {
			entities.add(entityTranferFromDTO(dtos));
		}
		return entities;
	}

}