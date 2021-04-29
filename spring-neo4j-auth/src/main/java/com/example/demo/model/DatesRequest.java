package com.example.demo.model;

import java.time.LocalDate;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
@Node
public class DatesRequest {
	@Id @GeneratedValue
	private Long id;	
 private LocalDate startDate;
 private LocalDate endDate;
 private int duration;
public DatesRequest(LocalDate startDate, LocalDate endDate, int duration) {
	this.startDate = startDate;
	this.endDate = endDate;
	this.duration = duration;
}
public DatesRequest() {
	
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
