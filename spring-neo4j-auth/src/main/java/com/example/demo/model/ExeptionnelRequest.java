package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class ExeptionnelRequest extends VacacionRequest{
	@Id @GeneratedValue
	private Long id;
	private String description;
	private String vacacioType;
	public ExeptionnelRequest(LocalDate requestDate, String statut, String typeOfTime, List<DatesRequest> datesRequest,
			Collaborator collaborator, String description, String vacacioType) {
		super(requestDate, statut, typeOfTime, datesRequest, collaborator);
		
		this.description = description;
		this.vacacioType = vacacioType;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getVacacioType() {
		return vacacioType;
	}
	public void setVacacioType(String vacacioType) {
		this.vacacioType = vacacioType;
	}
	
	
}
