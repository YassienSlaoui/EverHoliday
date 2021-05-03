package com.example.demo.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Collaborator;
import com.example.demo.model.Solde;


public interface SoldeRepository extends Neo4jRepository<Solde, Long>{
	@Query("MATCH(p:Solde ) where ID(p)=$id MATCH(p)-[m]->(l) DELETE p,l,m")
	void delete(@Param("id")Long id);
}
