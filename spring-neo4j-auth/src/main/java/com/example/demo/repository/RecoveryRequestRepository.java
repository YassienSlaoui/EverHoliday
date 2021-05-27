package com.example.demo.repository;

import java.util.Collection;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Collaborator;
import com.example.demo.model.RecoveryRequest;


public interface RecoveryRequestRepository extends Neo4jRepository<RecoveryRequest, Long>{
	@Query("MATCH(n:RecoveryRequest (m:RecoveryRequest {Collaborator:$username}  RETURN n,m ")
	Collection<RecoveryRequest> getbyUser(@Param("username") Collaborator username);
	@Query("MATCH (n:RecoveryRequest)-[r:DATES_REQUEST]->(p:DatesRequest) WHERE ID(n)=$id DETACH DELETE n,p,r")
	void deleteAll(@Param("id") Long id);
}
