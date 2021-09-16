package com.example.demo.dto;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.neo4j.core.schema.Relationship;

public class VacacionRequestDTO {

 
 private LocalDate requestDate;
 private String statut;
 private String typeOfTime;
 private List<DatesRequestDTO> datesRequest;
 private CollaboratorDTO collaborator;

public VacacionRequestDTO(LocalDate requestDate, String statut, String typeOfTime, List<DatesRequestDTO> datesRequest,
		CollaboratorDTO collaborator) {
	super();
	this.requestDate = requestDate;
	this.statut = statut;
	this.typeOfTime = typeOfTime;
	this.datesRequest = datesRequest;
	this.collaborator = collaborator;
}

public VacacionRequestDTO() {}

public LocalDate getRequestDate() {
	return requestDate;
}
public void setRequestDate(LocalDate requestDate) {
	this.requestDate = requestDate;
}
public String getStatut() {
	return this.statut;
}
public void setStatut(String statut) {
	this.statut = statut;
}
public List<DatesRequestDTO> getDatesRequest() {
	return datesRequest;
}

public void setDatesRequest(List<DatesRequestDTO> datesRequest) {
	this.datesRequest = datesRequest;
}

public CollaboratorDTO getCollaborator() {
	return collaborator;
}

public void setCollaborator(CollaboratorDTO collaborator) {
	this.collaborator = collaborator;
}
public String getTypeOfTime() {
	return typeOfTime;
}

public void setTypeOfTime(String typeOfTime) {
	this.typeOfTime = typeOfTime;
}

}



