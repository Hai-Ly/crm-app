package com.logigear.crm.career.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatcher;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.logigear.crm.career.exception.MultiErrorException;
import com.logigear.crm.career.mail.MailData;
import com.logigear.crm.career.mail.MailSender;
import com.logigear.crm.career.model.User;
import com.logigear.crm.career.payload.ChangePasswordRequest;
import com.logigear.crm.career.payload.ForgotPasswordRequest;
import com.logigear.crm.career.payload.SignUpRequest;
import com.logigear.crm.career.property.AppProperties;
import com.logigear.crm.career.repository.UserRepository;
import com.logigear.crm.career.security.GreenTokenService;
import com.logigear.crm.career.security.JWTUtil;
import com.logigear.crm.career.util.AppConstants;
import com.logigear.crm.career.util.MessageUtil;
import com.logigear.crm.career.util.Util;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;
import reactor.util.function.Tuple3;

@Service
public class UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	private UserRepository userRepository;
	
	private PasswordEncoder passwordEncoder;	
	
	private JWTUtil jwtUtil;
	
	private AppProperties properties;
	
	private GreenTokenService greenTokenService;
	
	private MailSender<MailData> mailSender;
	
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			JWTUtil jwtUtil, AppProperties properties, ReactiveUserDetailsService userDetailsService,
			GreenTokenService greenTokenService, MailSender<MailData> mailSender)  {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
		this.properties = properties;
		this.greenTokenService = greenTokenService;
		this.mailSender = mailSender;
	}
	
	/**
     * This method is called after the application is ready.
     * Needs to be public - otherwise Spring screams.
     * 
     * @param event
     */
    @EventListener
    public void afterApplicationReady(ApplicationReadyEvent event) {
    	onStartup(); // delegate to onStartup()
    }
	
    public void onStartup() {
    	findUserByEmail(properties.getAdmin().getEmail()) // Check if the user already exists
    		.doOnError(e -> {
    			System.out.println("findUserByEmail: " + e);
    			if(e instanceof MultiErrorException) {
    				final User user = new User();
    	    	    user.setName(properties.getAdmin().getName());
    	    	    user.setEmail(properties.getAdmin().getEmail());
    	    		user.setPassword(passwordEncoder.encode(properties.getAdmin().getPassword()));
    	    		user.getRoles().add(User.Role.ADMIN);
    	    			
    	    		Mono.just(user)
    	    			.doOnNext(u -> logger.info("Creating the first admin user: " + u.getEmail()))
    					.flatMap(u -> userRepository.save(u))
    					.doOnNext(u -> logger.info("Created admin user"))
    					.doOnError(err -> logger.warn("Error creating initial admin " + err))
    					.subscribe();
    			}
    		})
			.subscribe();
	}
	
    @PreAuthorize("hasAuthority('ADMIN')") 
	public Flux<User> getUsers(long limit) {
		if (-1 == limit) {
			return userRepository.findAll();
		}
		return userRepository.findAll().take(limit);
	}

	public Mono<User> findUserById(String id) {
		return userRepository.findById(id).switchIfEmpty(Util.notFoundMono());
	}

	public Mono<User> findUserByEmail(String email) {
		return userRepository.findByEmail(email).switchIfEmpty(Util.notFoundMono());
	}

	public Mono<User> findUserByExample(User user) {
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase()
				.withMatcher("email", GenericPropertyMatcher::contains)
				.withMatcher("role", GenericPropertyMatcher::contains)
				.withMatcher("enabled", GenericPropertyMatcher::exact);
		Example<User> example = Example.of(user, matcher);
		return userRepository.findOne(example);
	}

	public Mono<User> signin(String email, String password) {
		
		return findUserByEmail(email)
				.map(user -> {
					if (passwordEncoder.matches(password, user.getPassword())) {
						return user;
					} else {
						throw new BadCredentialsException("Password is incorrect");
					}
				});
	}
	
	public Mono<User> signup(Mono<SignUpRequest> signUpRequest) {
		return signUpRequest
				.map(req -> {
					User u = new User();
					u.setEmail(req.getEmail());
					u.setName(req.getName());
					u.setPassword(req.getPassword());
					return u;
				})
				.doOnNext(this::initUser)
				.flatMap(userRepository::save);
		
	}
	
	private void initUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword())); // encode the password
	}	

	public Mono<User> updateUser(Mono<User> currentUser, String id, Mono<String> patch) {
		
		return Mono.zip(currentUser, findUserById(id), patch)
			.doOnNext(this::ensureEditable)
			.map( tuple3 -> this.updateUser(tuple3.getT1(), tuple3.getT2(), tuple3.getT3()))
			.flatMap(userRepository::save)
			.map(user -> {
				return user;
			});
	}

	private User updateUser(User currentUser, User user, String patch) {
		
		User updatedUser = Util.applyPatch(user, patch); // create a patched form
		
		// Another good admin must be logged in to edit roles
		boolean isGoodAdmin = currentUser.hasRole(User.Role.ADMIN) 
				&& !(currentUser.hasRole(User.Role.UNVERIFIED) || currentUser.hasRole(User.Role.BLOCKED));
		
		if (isGoodAdmin && !currentUser.getId().equals(user.getId())) {

			logger.debug("Updating roles for user: " + user);

			// update the roles
			// TODO : Need to review UNVERIFIED
			if (!user.getRoles().equals(updatedUser.getRoles())) { // roles are difference
				
				/*
				if (updatedUser.hasRole(UserUtils.Role.UNVERIFIED)) {
	
					if (!user.hasRole(UserUtils.Role.UNVERIFIED)) {
	
						makeUnverified(user); // make user unverified
					}
				} else {
	
					if (user.hasRole(UserUtils.Role.UNVERIFIED))
						user.getRoles().remove(UserUtils.Role.UNVERIFIED); // make user verified
				}*/
	
				user.setRoles(updatedUser.getRoles());
			}
	}

		logger.debug("Updated user: " + user);
		return user;
	}
	
	
	public Mono<User> changePassword(String id, Mono<ChangePasswordRequest> changePasswordRequest) {
		
		return Mono.zip(findUserById(id), Util.currentUser())
				.doOnNext(this::ensureEditable)
				.flatMap(tuple -> Mono.zip(
						Mono.just(tuple.getT1()),
						findUserById(tuple.getT2().getId()),
						changePasswordRequest)
				.doOnNext(this::changePassword))
				.map(Tuple2::getT1)
				.flatMap(userRepository::save)
				.map(user -> {
					return user;
				});
	}

	private void changePassword(Tuple3<User,User,ChangePasswordRequest> tuple) {
		
		User user = tuple.getT1();
		User loggedIn = tuple.getT2();
		ChangePasswordRequest changePasswordForm = tuple.getT3();
		
		logger.debug("Changing password for user: " + user);
		
		String oldPassword = loggedIn.getPassword();

		Util.validateField("changePasswordRequest.oldPassword",
			passwordEncoder.matches(changePasswordForm.getOldPassword(), oldPassword),
			"com.logigear.crm.career.error.wrong.password").go();
		
		// sets the password
		user.setPassword(passwordEncoder.encode(changePasswordForm.getPassword()));
		logger.debug("Changed password for user: " + user);
	}
	
	public Mono<Void> forgotPassword(Mono<ForgotPasswordRequest> forgotPasswordRequest) {
		
		return forgotPasswordRequest
				.flatMap(req -> this.findUserByEmail(req.getEmail()))
				.doOnSuccess(this::mailForgotPasswordLink)
				.then();
	}

	public void mailForgotPasswordLink(User user) {
		
		logger.debug("Mailing forgot password link to user: " + user);

		// TODO: test
		String forgotPasswordCode = greenTokenService.generateToken(user, GreenTokenService.FORGOT_PASSWORD_SECRET);

		// make the link
		String forgotPasswordLink =	properties.getApplicationUrl() + "/reset-password?code=" + forgotPasswordCode;
		
		mailSender.send(MailData.of(user.getEmail(),
				MessageUtil.getMessage("com.logigear.crm.career.forgotPasswordSubject"),
				MessageUtil.getMessage("com.logigear.crm.career.forgotPasswordEmail",
					forgotPasswordLink)));
		
		
		logger.debug("Forgot password link mail queued.");
	}

	@PreAuthorize("hasAuthority('ADMIN')") 
    public Mono<Void> deleteUser(String id) {
        return userRepository.deleteById(id);
    }
	
	/**
	 * returns the current user and a new authorization token in the response
	 */
	public Mono<User> userWithToken(Mono<User> user, ServerHttpResponse response) {

		return user.doOnNext(u -> {
			response.getHeaders().add(AppConstants.TOKEN_RESPONSE_HEADER_NAME, AppConstants.TOKEN_PREFIX + jwtUtil.generateToken((User) u));
		});
	}
	
	private void ensureEditable(Tuple2<User, User> tuple) {
		
		if(tuple.getT2().hasPermission(tuple.getT1(), User.Permission.EDIT)) {
			return;
		}
		throw new AccessDeniedException(MessageUtil.getMessage("com.logigear.crm.career.error.notGoodAdminOrSameUser"));
	}
}
