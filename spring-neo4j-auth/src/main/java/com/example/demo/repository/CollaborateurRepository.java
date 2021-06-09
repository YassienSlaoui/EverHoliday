package com.example.demo.repository;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.demo.model.Collaborator;
public interface CollaborateurRepository extends Neo4jRepository<Collaborator, Long>{
	@Query("MATCH(n:Collaborator {username:$username}) RETURN n ")
	UserDetails login(@Param("username")String username);
	/*@Query("MATCH (n:Collaborator) WITH n MATCH(m:Supervisor) WHERE n.unite_organisationelle=m.unite_organisationelle MERGE (n)-[c:assignment]->(m)")
	void makeRelation();*/
	@Query("MATCH(n:Collaborator {username:$username}) RETURN n ")
	Collaborator logins(@Param("username")String username);
	@Query("MATCH(n:Collaborator {email:$email}) RETURN n ")
    public Collaborator findByEmail(@Param("email")String email); 
	@Query("MATCH(n:Collaborator {reset_token:$reset_token}) RETURN n ")
    public Collaborator findByResetPasswordToken(String token);
	
    //@Query("MATCH(n:Collaborator {email:$email}) RETURN n ")
    //Collaborator forgotpass(@Param("email")String email);
	
}
