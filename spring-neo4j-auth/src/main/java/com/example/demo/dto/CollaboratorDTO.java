package com.example.demo.dto;

import java.time.LocalDate;
import java.util.ArrayList;




public class CollaboratorDTO {
	

	private Long id;
	private String cin;
    private Integer age;
	private LocalDate birthday;
    private String team;
    
    private String firstname;
    
    private String lastname;
    private String adresse;
    
    private int experience;
    private String email;
    private String username;
    private String password;
    private LocalDate startDate;
    private LocalDate leaveDate;
    
    
    private String resetPasswordToken;
    private String role;
	private ArrayList<OrganizationalUnitDTO> unit;
    private String country;
	private SoldeDTO solde;
	private CollaboratorDTO sup;
	private ArrayList<CollaboratorDTO> Collaborators;

	private Long codeValidation;

    //@Relationship(type = "notification", direction = Relationship.Direction.OUTGOING)
	//private ArrayList<Notification> notification;

	public CollaboratorDTO( Integer age, String firstname, String lastname, String adresse,
			String username, String country, String password,int experience,String email,
			LocalDate startDate,LocalDate birthday) {
		this.age = age;
		this.firstname = firstname;
		this.lastname = lastname;
		this.adresse = adresse;
		this.username = username;
		this.password = password;
		this.country = country;
		this.experience=experience;
		this.email=email;
		this.startDate=startDate;
		this.birthday=birthday;
		
	}
	public CollaboratorDTO() {}
	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getLeaveDate() {
		return leaveDate;
	}

	public void setLeaveDate(LocalDate leaveDate) {
		this.leaveDate = leaveDate;
	}

	

	public void setUnit(ArrayList<OrganizationalUnitDTO> unit) {
		this.unit = unit;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getExperience() {
		return experience;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public CollaboratorDTO getSup() {
		if(this.sup!= null)
		return sup;
		else 
		return null;
	}
	
	
	public LocalDate getBirthday() {
		return birthday;
	}
	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}
	public ArrayList<OrganizationalUnitDTO> getUnit() {
		return unit;
	}
	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		this.team = team;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public SoldeDTO getSolde() {
		return solde;
	}

	public void setSolde(SoldeDTO solde) {
		this.solde = solde;
	}

	public void setSup(CollaboratorDTO sup) {
		this.sup = sup;
	}
	public ArrayList<CollaboratorDTO> getCollaborators() {
		return Collaborators;
	}
	public void setCollaborators(ArrayList<CollaboratorDTO> collaborators) {
		Collaborators = collaborators;
	}
	@Override
	public String toString() {
		return "CollaboratorDTO [id=" + id + ", cin=" + cin + ", age=" + age + ", birthday=" + birthday + ", team="
				+ team + ", firstname=" + firstname + ", lastname=" + lastname + ", adresse=" + adresse
				+ ", experience=" + experience + ", email=" + email + ", username=" + username + ", password="
				+ password + ", startDate=" + startDate + ", leaveDate=" + leaveDate + ", resetPasswordToken="
				+ resetPasswordToken + ", role=" + role + ", unit=" + unit + ", country=" + country + ", solde=" + solde
				+ ", sup=" + sup + ", Collaborators=" + Collaborators + ", codeValidation=" + codeValidation + "]";
	}
	
}
