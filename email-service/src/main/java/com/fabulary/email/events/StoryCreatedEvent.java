package com.fabulary.email.events;

import java.time.Instant;

public record StoryCreatedEvent(
        Long id,
        String title,
        String content,
        Long authorId,
        Instant createdAt
) {}