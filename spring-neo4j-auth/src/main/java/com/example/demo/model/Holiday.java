package com.example.demo.model;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class Holiday {
	@Id @GeneratedValue
 private Long id;
 private String name;
 private String date;
 private String  duration;
 private String country;
public Holiday(String name, String date, String duration,String country){
	this.name = name;
	this.date = date;
	this.duration = duration;
	this.country=country;
}
public Holiday(){}
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
