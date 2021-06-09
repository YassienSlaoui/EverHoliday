package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.neo4j.core.schema.Relationship;

public class VacacionRequest {

 
 private LocalDate requestDate;
 private String statut;
 private String typeOfTime;
 @Relationship(type = "DATES_REQUEST", direction = Relationship.Direction.OUTGOING)
 private List<DatesRequest> datesRequest;
 @Relationship(type = "USER", direction = Relationship.Direction.OUTGOING)
 private Collaborator collaborator;

public VacacionRequest(LocalDate requestDate, String statut, String typeOfTime, List<DatesRequest> datesRequest,
		Collaborator collaborator) {
	super();
	this.requestDate = requestDate;
	this.statut = statut;
	this.typeOfTime = typeOfTime;
	this.datesRequest = datesRequest;
	this.collaborator = collaborator;
}

public VacacionRequest() {}

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
public List<DatesRequest> getDatesRequest() {
	return datesRequest;
}

public void setDatesRequest(List<DatesRequest> datesRequest) {
	this.datesRequest = datesRequest;
}

public Collaborator getCollaborator() {
	return collaborator;
}

public void setCollaborator(Collaborator collaborator) {
	this.collaborator = collaborator;
}
public String getTypeOfTime() {
	return typeOfTime;
}

public void setTypeOfTime(String typeOfTime) {
	this.typeOfTime = typeOfTime;
}

}



