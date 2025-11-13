package com.fabulary.gateway.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor("12345df78abc0000000000aaaaaaak1234aaaaaa231345aaa98bbaaacdfaaahaj".getBytes());

    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserIdFromToken(String token) {
        return getClaims(token).get("userId", String.class);
    }

    public String getEmailFromToken(String token) {
        return getClaims(token).get("email", String.class);
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}