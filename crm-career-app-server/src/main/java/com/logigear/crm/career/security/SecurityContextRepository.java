package com.logigear.crm.career.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.logigear.crm.career.util.AppConstants;

import reactor.core.publisher.Mono;

@Component
public class SecurityContextRepository implements ServerSecurityContextRepository {

	@Autowired
	private ReactiveAuthenticationManager authenticationManager;

	@Override
	public Mono<Void> save(ServerWebExchange exchange, SecurityContext context) {
		throw new UnsupportedOperationException("Not supported yet.");
	}

	@Override
	public Mono<SecurityContext> load(ServerWebExchange exchange) {
		ServerHttpRequest request = exchange.getRequest();
		String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

		if (authHeader != null && authHeader.startsWith(AppConstants.TOKEN_PREFIX)) {
			String authToken = authHeader.substring(7);
			Authentication auth = new UsernamePasswordAuthenticationToken(authToken, authToken);
			return this.authenticationManager.authenticate(auth).map((authentication) -> {
				return new SecurityContextImpl(authentication);
			});
		} else {
			return Mono.empty();
		}
	}

}
