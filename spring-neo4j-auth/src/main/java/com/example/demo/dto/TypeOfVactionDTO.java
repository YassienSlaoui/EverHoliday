package com.example.demo.dto;

public class TypeOfVactionDTO {
	 private Long id;
	 private String name;
	 private int duration;
	public TypeOfVactionDTO(String name, int duration) {
		this.name = name;
		this.duration = duration;
	}
	public TypeOfVactionDTO() {
		// TODO Auto-generated constructor stub
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
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	 
}
