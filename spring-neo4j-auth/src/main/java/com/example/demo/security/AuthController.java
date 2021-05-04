package com.example.demo.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Collaborator;
import com.example.demo.model.JwtResponse;
import com.example.demo.service.CustomrService;
import com.example.demo.service.OrganizationalUintService;
@CrossOrigin(origins = "http://localhost:3000")
@Component
@RestController
@RequestMapping(value = "/rest/neo4j/auth")
public class AuthController {

    @Autowired
    private TokenUtil tokenUtil;
    @Autowired
    private CustomrService CustomrService;
    @Autowired
    private OrganizationalUintService OrganizationalUintService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = {"","/"})
    public JwtResponse signIn(@RequestBody SignInRequest signInRequest) {
    	final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(),signInRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = CustomrService.loadUserByUsername(signInRequest.getUsername());
        String token = tokenUtil.generateToken(userDetails);
        JwtResponse response = new JwtResponse(token);
        return response;
        }
    @PostMapping(value = {"/user"})
    public UserDetails getUser(@RequestBody SignInRequest signInRequest) {
    	

        UserDetails userDetails = CustomrService.loadUserByUsername(signInRequest.getUsername());
        
        return userDetails;
        }
    @PostMapping(value = {"/role"})
    public String role(@RequestBody SignInRequest signInRequest) {
        Collaborator userDetails = (Collaborator) CustomrService.loadUserByUsername(signInRequest.getUsername());
        System.out.println(OrganizationalUintService.checkValidator(userDetails));
        if(userDetails.getTeam().equals("admin RH")) {
        	return "RH";
        	
        }else if(OrganizationalUintService.checkValidator(userDetails) == 1) {
        	System.out.println(OrganizationalUintService.checkValidator(userDetails));
        	return "validator";
        }else if(OrganizationalUintService.checkValidator(userDetails) == 0) {
        	System.out.println(OrganizationalUintService.checkValidator(userDetails));
        	return "Collaborator";}
        else {
        	return "Collaborator";
        }
        
        }
}