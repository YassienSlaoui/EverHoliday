package com.example.demo.dto;

public class HolidayDTO {
	private Long id;
	private String name;
	private String date;
	private String duration;
	private String country;
	public HolidayDTO(String name, String date, String duration,String country) {
		this.name = name;
		this.date = date;
		this.duration = duration;
		this.country=country;
	}

	public HolidayDTO() {
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}
