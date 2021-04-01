package com.logigear.crm.career.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.logigear.crm.career.model.User;
import com.logigear.crm.career.payload.ForgotPasswordRequest;
import com.logigear.crm.career.payload.LoginRequest;
import com.logigear.crm.career.payload.SignUpRequest;
import com.logigear.crm.career.payload.UserResponse;
import com.logigear.crm.career.service.UserService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/signin")
	public Mono<UserResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, ServerHttpResponse response) {
		Mono<User> u = userService.signin(loginRequest.getEmail(), loginRequest.getPassword());
		return userService.userWithToken(u, response).map(UserResponse::new);
	}
	
    @PostMapping("/signup")
	@ResponseStatus(HttpStatus.CREATED)
	public Mono<UserResponse> signup(@Valid @RequestBody Mono<SignUpRequest> signUpRequest, ServerHttpResponse response) {
    	Mono<User> u = userService.signup(signUpRequest);
    	return userService.userWithToken(u, response).map(UserResponse::new);
	}
    
    /**
	 * The forgot Password feature
	 */
	@PostMapping("/forgot-password")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public Mono<Void> forgotPassword(@Valid @RequestBody Mono<ForgotPasswordRequest> forgotPasswordRequest) {
		
		return userService.forgotPassword(forgotPasswordRequest);
	}
}
