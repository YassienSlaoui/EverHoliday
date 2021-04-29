package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
@EnableScheduling
@SpringBootApplication
public class SpringNeo4jSecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringNeo4jSecurityApplication.class, args);
	}

}
