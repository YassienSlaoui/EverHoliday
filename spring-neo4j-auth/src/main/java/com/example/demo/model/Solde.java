package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
@Node
public class Solde {
	@Id @GeneratedValue
	private Long id;
	private LocalDate lastmodificatiodate;
	private Double cumulativeBalance;
	private List<DateByYears> cumulativeBances ;
	
	private Double annualBalance;
	private Double remainder;
	public Solde( LocalDate lastmodificatiodate, Double annualBalance,List<DateByYears> cumulativeBances,Double remainder) {
		this.lastmodificatiodate = lastmodificatiodate;
		this.annualBalance = annualBalance;
		this.cumulativeBances = cumulativeBances;
		this.remainder=remainder;
	}
	
	public Solde(){}
	
	public Double getCumulativeBalance() {
		return cumulativeBalance;
	}
	public void setCumulativeBalance(Double cumulativeBalance) {
		this.cumulativeBalance = cumulativeBalance;
	}
	public Double getAnnualBalance() {
		return annualBalance;
	}
	public void setAnnualBalance(Double annualBalance) {
		this.annualBalance = annualBalance;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getLastmodificatiodate() {
		return lastmodificatiodate;
	}
	public void setLastmodificatiodate(LocalDate lastmodificatiodate) {
		this.lastmodificatiodate = lastmodificatiodate;
	}
	public Double getRemainder() {
		return remainder;
	}
	public void setRemainder(Double remainder) {
		this.remainder = remainder;
	}
	public List<DateByYears> getCumulativeBances() {
		return cumulativeBances;
	}
	public void setCumulativeBances(List<DateByYears> cumulativeBances) {
		this.cumulativeBances = cumulativeBances;
	}
	
	
	

}
