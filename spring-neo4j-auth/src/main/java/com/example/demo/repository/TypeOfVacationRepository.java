package com.example.demo.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;


import com.example.demo.model.TypeOfVaction;

public interface TypeOfVacationRepository extends Neo4jRepository<TypeOfVaction, Long>{

}
