package com.example.demo.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;



public class SoldeDTO {
	private Long id;
	private LocalDate lastmodificatiodate;
	private Double cumulativeBalance;
	private List<DateByYearsDTO> cumulativeBances ;
	
	private Double annualBalance;
	private Double remainder;
	public SoldeDTO(  Double annualBalance,List<DateByYearsDTO> cumulativeBances,Double remainder) {
	
		this.annualBalance = annualBalance;
		this.cumulativeBances = cumulativeBances;
		this.remainder=remainder;
	}
	
	public SoldeDTO(){}
	
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
	public List<DateByYearsDTO> getCumulativeBances() {
		return cumulativeBances;
	}
	public void setCumulativeBances(List<DateByYearsDTO> cumulativeBances) {
		this.cumulativeBances = cumulativeBances;
	}
	
	
	

}
