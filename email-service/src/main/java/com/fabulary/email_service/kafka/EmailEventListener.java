package com.fabulary.email_service.kafka;

import com.fabulary.email.events.StoryCreatedEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class EmailEventListener {

    @KafkaListener(
            topics = "story.created",
            groupId = "email-service-group"
    )
    public void handleStoryCreated(StoryCreatedEvent event) {
        System.out.println("Recebido no email-service: " + event);
    }
}