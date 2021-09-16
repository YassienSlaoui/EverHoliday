package com.example.demo.dto;

import java.time.LocalDate;

public class DatesRequestDTO {
	private Long id;
	private LocalDate startDate;
	private LocalDate endDate;
	private int duration;

	public DatesRequestDTO(LocalDate startDate, LocalDate endDate, int duration) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.duration = duration;
	}

	public DatesRequestDTO() {

	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
