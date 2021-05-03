package com.example.demo.model;

import java.util.ArrayList;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
@Node
public class OrganizationalUnit {
	@Id @GeneratedValue
	private Long id;
	private String name;
	@Relationship(type = "unit", direction = Relationship.Direction.OUTGOING)
	private Collaborator validator;
	@Relationship(type = "unit", direction = Relationship.Direction.INCOMING)
	private ArrayList<Collaborator> collaborators;
	
	public OrganizationalUnit(String name, Collaborator validator, ArrayList<Collaborator> collaborators) {
		this.name = name;
		this.validator = validator;
		this.collaborators = collaborators;
	}
	
	public OrganizationalUnit(){}
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
	public Collaborator getValidator() {
		return validator;
	}
	public void setValidator(Collaborator validator) {
		this.validator = validator;
	}
	public ArrayList<String> getCollaborators() {
		ArrayList<String> A = new ArrayList<String>() ;
		if(collaborators !=null) {
			for (int i = 0 ;i<collaborators.size();i++) {
				 A.add(collaborators.get(i).getFirstname()+" " +collaborators.get(i).getLastname());
			}
		}
		
		
		return A;
		
	}
	public ArrayList<Collaborator> getCollaborators1() {
		return collaborators;
		
	}
	public void setCollaborators(ArrayList<Collaborator> collaborators) {
		this.collaborators = collaborators;
	}
	
}
