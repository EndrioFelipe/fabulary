package com.fabulary.stories.repository;

import com.fabulary.stories.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
}