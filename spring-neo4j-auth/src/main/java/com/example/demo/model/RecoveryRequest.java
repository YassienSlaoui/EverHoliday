package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
@Node
public class RecoveryRequest extends VacacionRequest{
	@Id @GeneratedValue
private Long id;
	private String description;
	private int totalDays;
	private int startHour;
	private int endHour;
public RecoveryRequest(LocalDate requestDate, String statut, String typeOfTime, List<DatesRequest> datesRequest,
			Collaborator collaborator, String description, int totalDays) {
		super(requestDate, statut, typeOfTime, datesRequest, collaborator);
		this.description = description;
		this.totalDays = totalDays;
	}


public RecoveryRequest() {}

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

public int getTotalDays() {
	return  totalDays;
}

public void setTotalDays(int totalDays) {
	this.totalDays = totalDays;
}
private String justification ;
public String getJustification() {
	return justification;
}

public void setJustification(String justification) {
	this.justification = justification;
}


public int getStartHour() {
	return startHour;
}


public void setStartHour(int startHour) {
	this.startHour = startHour;
}


public int getEndHour() {
	return endHour;
}



public void setEndHour(int endHour) {
	this.endHour = endHour;
}

}
