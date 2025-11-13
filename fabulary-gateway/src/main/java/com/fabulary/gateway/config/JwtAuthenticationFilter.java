package com.fabulary.gateway.config;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import reactor.core.publisher.Mono;

/* a função desse filtro é:
 - ele serve para fazer o Gateway controlar a segurança do sistema, antes de deixar qualquer requisição entrar nos microserviços
 - interceptar toda requisição que entra no Gateway;
 Ver se a rota é pública ou privada
 Se for privada: pegar o token - validar o token - extrair as claims - anexar os dados do usuário nos headers internos
 dai depois então repassar para os microserviços
os microsserviçõs não precisarão validar token nenhum , tudo é feito aqui no gateway */
@Component
@RequiredArgsConstructor // injeção automática de dependência pra todo mundo
public class JwtAuthenticationFilter implements GlobalFilter { //implementa o global filter pq  quero filtrar todas as requisições que passam pelo gateway

    private final JwtUtil jwtUtil;

    private static final String[] PUBLIC_ROUTES = {
            "/api/auth/login",
            "/api/auth/register",
            "/api/auth/validate"
    };

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();

        if (isPublic(path)) {
            return chain.filter(exchange);
        }

        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return this.onError(exchange, "Missing or invalid Authorization header", HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.validateToken(token)) {
            return this.onError(exchange, "Invalid or expired token", HttpStatus.UNAUTHORIZED);
        }

        String userId = jwtUtil.getUserIdFromToken(token);
        String email = jwtUtil.getEmailFromToken(token);

        ServerWebExchange mutated = exchange.mutate()
                .request(builder -> builder
                        .header("X-User-Id", userId)
                        .header("X-User-Email", email)
                )
                .build();

        return chain.filter(mutated);
    }

    private boolean isPublic(String path) {
        for (String route : PUBLIC_ROUTES) {
            if (path.startsWith(route)) {
                return true;
            }
        }
        return false;
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        exchange.getResponse().setStatusCode(httpStatus);
        return exchange.getResponse().setComplete();
    }
}