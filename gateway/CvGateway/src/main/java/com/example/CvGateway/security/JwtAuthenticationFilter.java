package com.example.CvGateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.util.List;

@Slf4j
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class JwtAuthenticationFilter implements WebFilter {

    @Value("${custom.app.jwtSecret}")
    private final String jwtSecret;

    public JwtAuthenticationFilter(String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String path = exchange.getRequest().getPath().value();

        // Skip filtering for public auth endpoints
        if (path.startsWith("/api/auth/") ||
                exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
            return chain.filter(exchange);
        }

        log.info("JwtAuthenticationFilter processing request for path: {}", path);

        // Log incoming headers for debugging
        log.info("Incoming request headers:");
        exchange.getRequest().getHeaders().forEach((name, values) ->
                log.info("{}: {}", name, values));

        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("No valid Authorization header found - rejecting request");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        log.debug("Extracted JWT token");

        Claims claims;
        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String sub = claims.getSubject();
        log.info("Extracted subject (sub) from JWT: {}", sub);

        // Create authentication token
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(sub, null, List.of());
        SecurityContextImpl context = new SecurityContextImpl(authentication);

        // Create mutated exchange with ALL original headers plus X-User-Sub
        ServerWebExchange mutatedExchange = exchange.mutate()
                .request(builder -> {
                    // Preserve all existing headers
                    exchange.getRequest().getHeaders().forEach((name, values) -> {
                        for (String value : values) {
                            builder.header(name, value);
                        }
                    });
                    // Add/overwrite our custom header
                    builder.header("X-User-Sub", sub);
                    builder.header("X-Forwarded-User-Sub", sub);                    // Explicitly preserve Content-Type if present
                    if (exchange.getRequest().getHeaders().containsKey(HttpHeaders.CONTENT_TYPE)) {
                        builder.header(HttpHeaders.CONTENT_TYPE,
                                exchange.getRequest().getHeaders().getFirst(HttpHeaders.CONTENT_TYPE));
                    }
                })
                .build();

        // Log outgoing headers for debugging
        log.info("Outgoing request headers after mutation:");
        mutatedExchange.getRequest().getHeaders().forEach((name, values) ->
                log.info("{}: {}", name, values));

        return chain.filter(mutatedExchange)
                .contextWrite(ReactiveSecurityContextHolder.withSecurityContext(Mono.just(context)));
    }
}