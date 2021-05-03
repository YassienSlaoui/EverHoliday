package com.example.demo.model;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
@Node
public class PaidRequest extends VacacionRequest {
@Id @GeneratedValue	
private Long id;
private String description;
private int balanceUsed;
public PaidRequest(LocalDate requestDate, String statut, String typeOfTime, List<DatesRequest> datesRequest,
		Collaborator collaborator, String description, int balanceUsed) {
	super(requestDate, statut, typeOfTime, datesRequest, collaborator);
	this.description = description;
	this.balanceUsed = balanceUsed;
}

public PaidRequest(){}

public String getDescription() {
	return description;
}

public void setDescription(String description) {
	this.description = description;
} 
public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public int getBalanceUsed() {
	return balanceUsed;
}

public void setBalanceUsed(int balanceUsed) {
	this.balanceUsed = balanceUsed;
}



}
