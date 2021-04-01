package com.logigear.crm.career.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;

import reactor.core.publisher.Mono;

@Component
public class AuthenticationManager implements ReactiveAuthenticationManager {

	@Autowired
    private JWTUtil jwtUtil;
	
	@Autowired
	private CustomReactiveUserDetailsService userDetailsService;
	
	@Override
	public Mono<Authentication> authenticate(Authentication authentication) {
		String authToken = authentication.getCredentials().toString();
		
		String username;
        try {
            username = jwtUtil.getUsernameFromToken(authToken);
        } catch (Exception e) {
            username = null;
        }
        
        if (username != null && jwtUtil.validateToken(authToken)) {
            return userDetailsService.findByUsername(username)
            	.flatMap(userDetails -> {
            		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    return Mono.just(auth).subscriberContext(ReactiveSecurityContextHolder.withAuthentication(auth));
            	});
            
        } else {
            return Mono.empty();
        }
   
	}
}
