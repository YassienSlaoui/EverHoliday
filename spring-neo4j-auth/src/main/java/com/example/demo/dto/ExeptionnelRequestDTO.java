package com.example.demo.dto;


import java.time.LocalDate;
import java.util.List;




public class ExeptionnelRequestDTO extends VacacionRequestDTO{
	private Long id;
	private String description;
	private TypeOfVactionDTO vacacioType;
	public ExeptionnelRequestDTO(LocalDate requestDate, String statut, String typeOfTime, List<DatesRequestDTO> datesRequest,
			CollaboratorDTO collaborator, String description, TypeOfVactionDTO vacacioType) {
		super(requestDate, statut, typeOfTime, datesRequest, collaborator);
		
		this.description = description;
		this.vacacioType = vacacioType;
	}
	public ExeptionnelRequestDTO(){}
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
	public TypeOfVactionDTO getVacacioType() {
		return vacacioType;
	}
	public void setVacacioType(TypeOfVactionDTO vacacioType) {
		this.vacacioType = vacacioType;
	}
	private String justification ;
	public String getJustification() {
		return justification;
	}

	public void setJustification(String justification) {
		this.justification = justification;
	}

	
}
