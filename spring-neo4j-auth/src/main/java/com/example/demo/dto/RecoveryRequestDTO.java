package com.example.demo.dto;

import java.time.LocalDate;
import java.util.List;

public class RecoveryRequestDTO extends VacacionRequestDTO {

	private Long id;
	private String description;
	private int totalDays;
	private int startHour;
	private int endHour;

	public RecoveryRequestDTO(LocalDate requestDate, String statut, String typeOfTime,
			List<DatesRequestDTO> datesRequest, CollaboratorDTO collaborator, String description, int totalDays) {
		super(requestDate, statut, typeOfTime, datesRequest, collaborator);
		this.description = description;
		this.totalDays = totalDays;
	}

	public RecoveryRequestDTO() {
	}

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
		return totalDays;
	}

	public void setTotalDays(int totalDays) {
		this.totalDays = totalDays;
	}

	private String justification;

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
