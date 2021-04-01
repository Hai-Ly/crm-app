package com.logigear.crm.career.model;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.logigear.crm.career.model.audit.DateAudit;
import com.logigear.crm.career.validation.ValidRoles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "users")
@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class User extends DateAudit {

	private static final Logger logger = LoggerFactory.getLogger(User.class);
	
	private static final long serialVersionUID = 5644797795094164062L;

	@Id
    private String id;
	
	@NotBlank
	@Size(max = 40)
	private String name;

	@NotBlank
	@Size(max = 40)
	@Email
	private String email;
	
	@NotBlank
    @Size(max = 100)
    private String password;
	
	@ValidRoles
	private Set<String> roles = new HashSet<>();
	
	public User(User user) { 
	    this.id = user.id;
	    this.name = user.name;
	    this.email = user.email;
	    this.password = user.password;
	    this.roles = user.roles;
	}
	
	public boolean hasRole(String role) {
		return roles.contains(role);
	}	
	
	public boolean hasPermission(User currentUser, String permission) {
		
		logger.debug("Computing " + permission + " permission for User " + id + "\n  Logged in user: " + currentUser);
		
		if (permission.equals(Permission.EDIT)) {

			if (currentUser == null)
				return false;

			if(currentUser.getId().equals(id)) {
				return true; // itself
			}
			
			Set<String> roles = currentUser.getRoles();
			
			boolean isGoodAdmin = roles.contains(User.Role.ADMIN) 
					&& !(roles.contains(User.Role.UNVERIFIED) || roles.contains(User.Role.BLOCKED));
			
			return isGoodAdmin;
		}

		return false;
		
	}
	
	public interface Permission {

		static final String EDIT = "edit";
	}
	
	public interface Role {

		static final String UNVERIFIED = "UNVERIFIED";
		static final String BLOCKED = "BLOCKED";
		static final String ADMIN = "ADMIN";
		static final String TRAINER = "TRAINER";
		static final String TRAINEE = "TRAINEE";
		static final String MANAGER = "MANAGER";
	}
}
