package com.fabulary.stories.events;

public record StoryCreatedEvent(
        Long id,
        String title,
        String content,
        Long authorId,
        java.time.Instant createdAt
) {}
