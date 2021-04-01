package com.logigear.crm.career.security;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.logigear.crm.career.model.User;
import com.logigear.crm.career.property.AppProperties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class GreenTokenService {
	
	public static final String VERIFY_SECRET = "verify";
	public static final String FORGOT_PASSWORD_SECRET = "forgot-password";
	public static final String CHANGE_EMAIL_SECRET = "change-email";
	
	private static final Logger logger = LoggerFactory.getLogger(GreenTokenService.class);
	
	private Long expirationTime;
	
	public GreenTokenService(AppProperties properties) {
		this.expirationTime = properties.getJwt().getExpirationMillis();
	}
	
	public Claims getAllClaimsFromToken(String token, String secret) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	public String getUsernameFromToken(String token, String secret) {
		return getAllClaimsFromToken(token, secret).getSubject();
	}

	public Date getExpirationDateFromToken(String token, String secret) {
		return getAllClaimsFromToken(token, secret).getExpiration();
	}

	private Boolean isTokenExpired(String token, String secret) {
		final Date expiration = getExpirationDateFromToken(token, secret);
		return expiration.before(new Date());
	}
	
	public String generateToken(User user, String secret) {
		
		final Date createdDate = new Date();
		final Date expirationDate = new Date(createdDate.getTime() + expirationTime * 1000);
		return Jwts.builder().setSubject(user.getEmail()).setIssuedAt(createdDate)
				.setExpiration(expirationDate).signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	public Boolean validateToken(String token, String secret) {
		try {
			Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
			return !isTokenExpired(token, secret);
		} catch (SignatureException ex) {
			logger.error("Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			logger.error("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			logger.error("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			logger.error("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			logger.error("JWT claims string is empty.");
		}
		return false;

	}
	
}
