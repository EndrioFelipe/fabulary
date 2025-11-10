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

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @PostMapping
    public ResponseEntity<Story> createStory(@RequestBody Story story) {
        Story saved = storyService.create(story);

        // salva o conto no banco e tbm manda pro kafka
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable Long id) {
        // se nao existir, o service já lança exceção e o handler devolve 404
        Story story = storyService.findById(id);
        return ResponseEntity.ok(story);
    }

    @GetMapping
    public ResponseEntity<List<Story>> getAllStories() {
        // lista todos os contos salvos no banco
        // aqui nao tem kafka nem nada, é só leitura
        List<Story> stories = storyService.findAll();
        return ResponseEntity.ok(stories);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        // deleta o conto pelo id, se nao existir o handler ja cuida
        storyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}