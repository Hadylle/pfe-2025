package com.example.CvGateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class JwtUtils {

    @Value("${custom.app.jwtSecret}")
    private String jwtSecret;

    public Claims validateTokenAndGetClaims(String token) {
        try {
            byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
            SecretKey key = Keys.hmacShaKeyFor(keyBytes);
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            System.out.println("JWT validation error in JwtUtils: " + e.getMessage());
            return null;
        }
    }
}
