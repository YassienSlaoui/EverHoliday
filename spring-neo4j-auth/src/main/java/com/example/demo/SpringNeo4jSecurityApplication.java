package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import com.example.demo.proceessImpl.EmailService;
@EnableScheduling
@SpringBootApplication
public class SpringNeo4jSecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringNeo4jSecurityApplication.class, args);
	}
	/*@Autowired
	private EmailService EmailService;
	@EventListener(ApplicationReadyEvent.class)
	public void triggerWhenStarted() {
		EmailService.sendSimpleMessage("bo.essabri@gmail.com", "msg from EverHolday", "Bonjour Yassine Slaoui, \n Votre demande sera enregistre du date 5-18-2021. \n Cordialement.");
		
	}*/

}
