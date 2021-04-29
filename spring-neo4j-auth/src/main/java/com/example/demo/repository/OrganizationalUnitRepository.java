package com.example.demo.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.example.demo.model.OrganizationalUnit;

public interface OrganizationalUnitRepository extends Neo4jRepository<OrganizationalUnit,Long>{

}
