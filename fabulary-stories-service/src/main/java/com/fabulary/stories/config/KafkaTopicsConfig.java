package com.fabulary.stories.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicsConfig {

    // 🏗️ Essa classe é como a "central dos correios" do sistema
    // Ela garante que a caixa de correio (tópico) exista para receber mensagens

    @Bean
    public NewTopic storyCreatedTopic() {

        // ✉️ Aqui criamos uma nova "caixa de correio" chamada "story.created".
        // É dentro dela que as mensagens (eventos) serão depositadas
        // toda vez que um novo conto for criado.

        // partitions(1) → é como dividir a caixa em 1 compartimento (pra simplificar).
        // replicas(1) → é como manter 1 cópia de segurança dessa caixa (pra tolerância a falhas).

        return TopicBuilder
                .name("story.created")   // nome da "caixa de correio"
                .partitions(1)           // número de divisões internas (1 é o básico)
                .replicas(1)             // número de cópias de segurança
                .build();                // constrói a caixa de correio
    }
}