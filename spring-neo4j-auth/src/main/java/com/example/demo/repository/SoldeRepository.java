package com.example.demo.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.example.demo.model.Solde;


public interface SoldeRepository extends Neo4jRepository<Solde, Long>{

}
