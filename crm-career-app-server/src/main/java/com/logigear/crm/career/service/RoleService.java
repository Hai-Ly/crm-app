package com.logigear.crm.career.service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.logigear.crm.career.model.User;

import reactor.core.publisher.Flux;

@Service
public class RoleService {

	final static public Set<String> VALID_ROLES = Stream.of(User.Role.UNVERIFIED, User.Role.BLOCKED, User.Role.ADMIN, 
	    		User.Role.TRAINER, User.Role.TRAINEE, User.Role.MANAGER).collect(Collectors.toCollection(HashSet<String>::new));
	
	@PreAuthorize("hasAuthority('ADMIN')")
	public Flux<String> getRoles() {
		return Flux.fromIterable(VALID_ROLES);
	}
}
