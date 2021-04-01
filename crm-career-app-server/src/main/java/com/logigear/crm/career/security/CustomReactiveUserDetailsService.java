package com.logigear.crm.career.security;

import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.logigear.crm.career.model.User;
import com.logigear.crm.career.repository.UserRepository;

import reactor.core.publisher.Mono;

@Component
public class CustomReactiveUserDetailsService implements ReactiveUserDetailsService {

	private UserRepository userRepository;
	
    public CustomReactiveUserDetailsService(UserRepository userRepository) {
    	this.userRepository = userRepository;
    }
    
	@Override
	public Mono<UserDetails> findByUsername(String username) {	
		return findUserByUsername(username).map(UserPrincipal::new);
	}
	
	/**
	 * Finds a user by the given username. Override this if you aren't using email
	 * as the username.
	 */
	public Mono<User> findUserByUsername(String username) {
		return userRepository.findByEmail(username);
	}
}
