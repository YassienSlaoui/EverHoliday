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
	@Query("MATCH(n:Collaborator)  WHERE n.email = ?1")
    public Collaborator findByEmail(String email); 
    public Collaborator findByResetPasswordToken(String token);
}
