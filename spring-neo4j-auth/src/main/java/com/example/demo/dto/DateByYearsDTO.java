package com.example.demo.dto;




public class DateByYearsDTO {
	private Long id;
	private int year;
	private Double balance;
	public DateByYearsDTO(int year, Double balance) {
		this.year = year;
		this.balance = balance;
	}
	public DateByYearsDTO(){}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	

}
