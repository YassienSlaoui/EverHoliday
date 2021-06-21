package com.example.demo.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.Notification;
import com.example.demo.repository.NotificationRepository;
@Service
public class NotificationService {

	@Autowired
	NotificationRepository notificationRepository;
	
	public Collection<Notification> getAll(){
		return notificationRepository.findAll();
	}
	 public void createNotificatio(Notification notification) {
		 notificationRepository.save(notification);
	 }
	 public Optional<Notification> getNotificationById(Long id) {
		 return notificationRepository.findById(id);
	 }
	
	 
	 public ResponseEntity<Map<String, Boolean>> deleteNotification(Long id){
		
		   notificationRepository.deleteById(id);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
	 
	 public void deleteAllNotifications() {
		 notificationRepository.deleteAll();
	 }
	 
}
