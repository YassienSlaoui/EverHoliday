package com.example.demo.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

import org.neo4j.driver.internal.shaded.reactor.util.annotation.NonNull;
import org.neo4j.ogm.annotation.Index;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Node
public class Collaborator   implements UserDetails{
	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue
	private Long id;
	@NonNull
	private String cin;
	@NonNull
    private Integer age;
	private LocalDate birthday;
    private String team;
    @NonNull
    private String firstname;
    @NonNull
    private String lastname;
    private String adresse;
    @NonNull
    private int experience;
    private String email;
    @Index(unique = true)
    private String username;
    private String password;
    private LocalDate startDate;
    private LocalDate leaveDate;
    
    private String resetPasswordToken;
    private String role;
    @Relationship(type = "a", direction = Relationship.Direction.INCOMING)
	private ArrayList<OrganizationalUnit> unit;
    private String country;
    @Relationship(type = "solde", direction = Relationship.Direction.OUTGOING)
	private Solde solde;
	@Relationship(type = "assignment", direction = Relationship.Direction.OUTGOING)
	private Collaborator sup;
	@Relationship(type = "assignment", direction = Relationship.Direction.INCOMING)
	private ArrayList<Collaborator> Collaborators;
	public Collaborator( Integer age, String firstname, String lastname, String adresse,
			String username, String country, String password,int experience,String email,LocalDate startDate,LocalDate birthday) {
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
	public Collaborator() {}
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

	

	public void setUnit(ArrayList<OrganizationalUnit> unit) {
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
	public String getSup() {
		if(this.sup!= null)
		return sup.getUsername();
		else 
		return null;
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

	public Solde getSolde() {
		return solde;
	}

	public void setSolde(Solde solde) {
		this.solde = solde;
	}

	public void setSup(Collaborator sup) {
		this.sup = sup;
	}
	public ArrayList<Collaborator> getCollaborators() {
		return Collaborators;
	}
	public void setCollaborators(ArrayList<Collaborator> collaborators) {
		Collaborators = collaborators;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	public String getResetPasswordToken() {
		return resetPasswordToken;
	}

	public void setResetPasswordToken(String resetPasswordToken) {
		this.resetPasswordToken = resetPasswordToken;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	public LocalDate getBirthday() {
		return birthday;
	}
	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}
	
	


}
