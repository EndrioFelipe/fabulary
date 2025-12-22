package com.fabulary.stories.events;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChildrenBookProducer {

    private final KafkaTemplate<String, Object> kafka;

    public ChildrenBookProducer(KafkaTemplate<String, Object> kafka) {
        this.kafka = kafka;
    }

    public void publishCreated(ChildrenBookCreatedEvent event) {
        kafka.send("children-book.created", event.id().toString(), event);
    }
}
