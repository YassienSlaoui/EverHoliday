package com.example.demo.dto;

import java.util.ArrayList;



public class OrganizationalUnitDTO {
	private Long id;
	private String name;
	private CollaboratorDTO validator;
	private ArrayList<CollaboratorDTO> collaborators;
	private String country;
	public OrganizationalUnitDTO(String name, CollaboratorDTO validator, ArrayList<CollaboratorDTO> collaborators,String country) {
		this.name = name;
		this.validator = validator;
		this.collaborators = collaborators;
		this.country=country;
	}
	
	public OrganizationalUnitDTO(){}
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
	public CollaboratorDTO getValidator() {
		return validator;
	}
	public void setValidator(CollaboratorDTO validator) {
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
	public ArrayList<CollaboratorDTO> getCollaborators1() {
		return collaborators;
		
	
	}
	public void setCollaborators(ArrayList<CollaboratorDTO> collaborators) {
		this.collaborators = collaborators;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
	
	
}
