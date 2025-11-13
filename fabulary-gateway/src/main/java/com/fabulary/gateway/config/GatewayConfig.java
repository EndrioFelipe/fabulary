package com.fabulary.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class GatewayConfig {

    //Esse filtro libera o Angular (localhost:4200) para falar com o gateway sem bloqueios para qualquer header, mpetodo htpp, etc
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.addAllowedOrigin("http://localhost:4200");
        cors.addAllowedMethod("*");
        cors.addAllowedHeader("*");
        cors.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);

        return new CorsWebFilter(source);
    }
}