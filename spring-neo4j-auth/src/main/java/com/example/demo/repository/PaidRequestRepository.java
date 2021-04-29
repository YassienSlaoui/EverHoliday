package com.example.demo.repository;

import java.util.Collection;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Collaborator;
import com.example.demo.model.PaidRequest;


public interface PaidRequestRepository extends Neo4jRepository<PaidRequest, Long>{
	@Query("MATCH(n:PaidRequest (m:PaidRequest {Collaborator:$username}  RETURN n,m ")
	Collection<PaidRequest> getbyUser(@Param("username") Collaborator username);
	
}
