package com.example.demo.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.example.demo.model.Notification;

public interface NotificationRepository  extends  Neo4jRepository<Notification, Long>{

}
