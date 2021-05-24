package com.example.demo.proceessImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	@Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
    	System.out.println("send email");
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("felkhaml@everis.com");
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        emailSender.send(message);
        System.out.println("sent email.....");
        
      
    }
}
