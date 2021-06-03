package com.example.demo.repository;

import java.util.Collection;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Collaborator;
import com.example.demo.model.UnpaidRequest;


public interface UnpaidRequestRepository extends Neo4jRepository<UnpaidRequest, Long>{
	@Query("MATCH(n:UnpaidRequest (m:UnpaidRequest {Collaborator:$username}  RETURN n,m ")
	Collection<UnpaidRequest> getbyUser(@Param("username") Collaborator username);
	@Query("MATCH (n:UnpaidRequest)-[r:DATES_REQUEST]->(p:DatesRequest) WHERE ID(n)=$id DETACH DELETE n,p,r")
	void deleteAll(@Param("id") Long id);
}
