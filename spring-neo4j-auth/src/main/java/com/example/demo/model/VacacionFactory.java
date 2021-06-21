package com.example.demo.model;

import java.time.LocalDate;
import java.util.List;

public class VacacionFactory {
	public static final int PaidRequestValue = 1;
	public static final int UnpaidRequestValue = 2;

	public VacacionRequest getProduitA(int typeProduit,PaidRequest a,UnpaidRequest b) {
		VacacionRequest vacacionFactory = null;

		    switch (typeProduit) {
		      case PaidRequestValue:
		    	  vacacionFactory =a;
		        break;
		      case UnpaidRequestValue:
		    	 vacacionFactory = b;
		        break;
		      default:
		        throw new IllegalArgumentException("Type de produit inconnu");
		    }

		    return vacacionFactory;
		  
}}
