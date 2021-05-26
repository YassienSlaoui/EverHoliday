package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node
public class ExeptionnelRequest extends VacacionRequest{
	@Id @GeneratedValue
	private Long id;
	private String description;
	 @Relationship(type = "vacacionType", direction = Relationship.Direction.OUTGOING)
	private TypeOfVaction vacacioType;
	public ExeptionnelRequest(LocalDate requestDate, String statut, String typeOfTime, List<DatesRequest> datesRequest,
			Collaborator collaborator, String description, TypeOfVaction vacacioType) {
		super(requestDate, statut, typeOfTime, datesRequest, collaborator);
		
		this.description = description;
		this.vacacioType = vacacioType;
	}
	public ExeptionnelRequest(){}
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
	public TypeOfVaction getVacacioType() {
		return vacacioType;
	}
	public void setVacacioType(TypeOfVaction vacacioType) {
		this.vacacioType = vacacioType;
	}
	
	
}
