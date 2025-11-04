package com.fabulary.stories.events;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class StoryProducer {

    private final KafkaTemplate<String, StoryCreatedEvent> kafka;

    //Producer (Produtor) → Carteiro que coloca a carta na caixa
    public StoryProducer(KafkaTemplate<String, StoryCreatedEvent> kafka) {
        this.kafka = kafka;
    }

    // Envia o evento (a "carta") para o Kafka (aa central dos correios)
    public void publishCreated(StoryCreatedEvent event) {
        kafka.send("story.created", event.id().toString(), event);
    }
}