package com.example.demo.dto;

import java.time.LocalDate;
import java.util.List;

public class PaidRequestDTO extends VacacionRequestDTO {
	private Long id;
	private String description;
	private double balanceUsed;
	public PaidRequestDTO(LocalDate requestDate, String statut, String typeOfTime, List<DatesRequestDTO> datesRequest,
			CollaboratorDTO collaborator, String description, double balanceUsed) {
		super(requestDate, statut, typeOfTime, datesRequest, collaborator);
		this.description = description;
		this.balanceUsed = balanceUsed;
	}

	public PaidRequestDTO() {
	}

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

	public double getBalanceUsed() {
		return balanceUsed;
	}

	public void setBalanceUsed(double balanceUsed) {
		this.balanceUsed = balanceUsed;
	}

	private String justification;

	public String getJustification() {
		return justification;
	}

	public void setJustification(String justification) {
		this.justification = justification;
	}

	

}
