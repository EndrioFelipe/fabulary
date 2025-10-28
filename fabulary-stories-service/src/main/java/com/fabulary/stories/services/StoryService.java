package com.fabulary.stories.services;


import com.fabulary.stories.models.Story;
import com.fabulary.stories.repository.StoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoryService {

    private final StoryRepository repository;

    public StoryService(StoryRepository repository) {
        this.repository = repository;
    }

    public List<Story> getAll() {
        return repository.findAll();
    }

    public Optional<Story> getById(Long id) {
        return repository.findById(id);
    }

    public Story create(Story story) {
        return repository.save(story);
    }

    public Story update(Long id, Story storyData) {
        return repository.findById(id)
                .map(story -> {
                    story.setTitle(storyData.getTitle());
                    story.setExcerpt(storyData.getExcerpt());
                    story.setContent(storyData.getContent());
                    return repository.save(story);
                })
                .orElseThrow(() -> new RuntimeException("Story not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
