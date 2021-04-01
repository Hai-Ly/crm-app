package com.logigear.crm.career.payload;

import java.util.HashSet;
import java.util.Set;

import com.logigear.crm.career.model.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class UserResponse {

	private String id;
	private String email;
	private String name;
	private Set<String> roles = new HashSet<>();
	
	private boolean unverified = false;
	private boolean blocked = false;
	private boolean admin = false;
	private boolean goodUser = false;
	private boolean goodAdmin = false;
	
	public UserResponse(User user) {
		
		id = user.getId();
		email = user.getEmail();
		name = user.getName();
		roles = user.getRoles();
		
		unverified = roles.contains(User.Role.UNVERIFIED);
		blocked = roles.contains(User.Role.BLOCKED);
		admin = roles.contains(User.Role.ADMIN);
		goodUser = !(unverified || blocked);
		goodAdmin = goodUser && admin;
	}
}
