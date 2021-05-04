package com.example.demo.model;

import java.util.ArrayList;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
@Node
public class Team {
	@Id  @GeneratedValue
	private Long id;
	private String name;
	@Relationship(type = "in", direction = Relationship.Direction.OUTGOING)
	private ArrayList<Collaborator> Collaborators;
	
	public Team( String name) {
		this.name = name;
	}
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
	public ArrayList<Collaborator> getCollaborators() {
		return Collaborators;
	}
	public void setCollaborators(ArrayList<Collaborator> collaborators) {
		Collaborators = collaborators;
	}

	
	
}
