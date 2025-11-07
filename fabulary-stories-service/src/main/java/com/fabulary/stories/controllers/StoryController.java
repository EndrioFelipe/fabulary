package com.fabulary.stories.controllers;


import com.fabulary.stories.models.Story;
import com.fabulary.stories.repository.StoryRepository;
import com.fabulary.stories.services.StoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stories")
@CrossOrigin(origins = "http://localhost:4200")
public class StoryController {

    private final StoryService storyService;
    private final StoryRepository repository;

    public StoryController(StoryService storyService, StoryRepository repository) {
        this.storyService = storyService;
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Story> createStory(@RequestBody Story story) {
        Story saved = storyService.create(story);

        // 💾 O Service grava esse manuscrito (no banco) e envia uma cópia (evento Kafka)
        // para a "caixa de correio" story.created, pra que outros sistemas saibam do novo conto.

        // 📤 Depois, devolvemos a resposta HTTP ao usuário confirmando a criação.
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<?> getAllStories() {
        return ResponseEntity.ok(storyService.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}