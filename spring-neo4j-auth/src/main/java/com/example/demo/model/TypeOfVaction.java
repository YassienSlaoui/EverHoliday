package com.example.demo.model;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class TypeOfVaction {
	@Id @GeneratedValue	
	 private Long id;
	 private String name;
	 private int duration;
	public TypeOfVaction(String name, int duration) {
		this.name = name;
		this.duration = duration;
	}
	public TypeOfVaction() {
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
