package com.example.demo.dto;

import java.util.ArrayList;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

public class TeamDTO {
	private Long id;
	private String name;
	private ArrayList<CollaboratorDTO> Collaborators;
	
	public TeamDTO( String name) {
		this.name = name;
	}
	
	public TeamDTO(){}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<CollaboratorDTO> getCollaborators() {
		return Collaborators;
	}
	public void setCollaborators(ArrayList<CollaboratorDTO> collaborators) {
		Collaborators = collaborators;
	}

	
	
}
