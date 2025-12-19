package com.fabulary.stories.events;

import org.springframework.kafka.core.KafkaTemplate;

public class ChildrenBookProducer {

    private final KafkaTemplate<String, ChildrenBookCreatedEvent> kafka;
    public ChildrenBookProducer(KafkaTemplate<String, ChildrenBookCreatedEvent> kafka) {
        this.kafka = kafka;
    }
    public void publishCreated(ChildrenBookCreatedEvent event) {
        kafka.send("story.created", event.id().toString(), event);
    }
}
