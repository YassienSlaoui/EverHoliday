package com.example.demo.transformer;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.config.EnableNeo4jAuditing;

import com.example.demo.dto.SoldeDTO;
import com.example.demo.model.DateByYears;
import com.example.demo.model.OrganizationalUnit;
import com.example.demo.model.Solde;

public class SoldeTranformer extends AbstractTransformer<Solde, SoldeDTO>{
	
	private DateByYearsTransformer dateByYearsTransformer=new DateByYearsTransformer();
	@Override
	public SoldeDTO entityTranferToDTO(Solde entity) {
		SoldeDTO dto = new SoldeDTO();
		dto.setId(entity.getId());
		dto.setRemainder(entity.getRemainder());
		dto.setAnnualBalance(entity.getAnnualBalance());
		dto.setLastmodificatiodate(entity.getLastmodificatiodate());
		dto.setCumulativeBalance(entity.getCumulativeBalance());
		if(entity.getCumulativeBances()!=null) {
		dto.setCumulativeBances(dateByYearsTransformer.entitytransferListToDTO(entity.getCumulativeBances()));
		}
		return dto;
	}

	@Override
	public Solde entityTranferFromDTO(SoldeDTO dto) {
		Solde entity = new Solde();
		entity.setId(dto.getId());
		entity.setRemainder(dto.getRemainder());
		entity.setAnnualBalance(dto.getAnnualBalance());
		entity.setLastmodificatiodate(dto.getLastmodificatiodate());
		entity.setCumulativeBalance(dto.getCumulativeBalance());
		if(dto.getCumulativeBances()!=null) {
			entity.setCumulativeBances(dateByYearsTransformer.entitytransferListFromDTO(dto.getCumulativeBances()));
			}		
		return entity;
	}

}
