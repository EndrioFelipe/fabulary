package com.fabulary.stories.controllers;


import com.fabulary.stories.models.ChildrenBook;
import com.fabulary.stories.models.Story;
import com.fabulary.stories.services.ChildrenBookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/stories/children")
@CrossOrigin(origins = "http://localhost:4200")
public class ChildrenBookController {

    private final ChildrenBookService childrenBookService;

    public ChildrenBookController(ChildrenBookService childrenBookService) {
        this.childrenBookService = childrenBookService;
    }

    @PostMapping
    public ResponseEntity<ChildrenBook> createStory(@RequestBody ChildrenBook childrenBook) {
        ChildrenBook saved = childrenBookService.create(childrenBook);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<ChildrenBook>> getAllStories() {
        // lista todos os contos salvos no banco
        // aqui nao tem kafka nem nada, é só leitura
        List<ChildrenBook> books = childrenBookService.findAll();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ChildrenBook>> filter(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String authorName,
            @RequestParam(required = false) BigDecimal value,
            @RequestParam(required = false) String ageRange
    ) {
        List<ChildrenBook> books = childrenBookService.filter(title, authorName, value, ageRange);

        return ResponseEntity.ok(books);
    }




}
