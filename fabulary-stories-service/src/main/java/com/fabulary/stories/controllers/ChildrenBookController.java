package com.fabulary.stories.controllers;


import com.fabulary.stories.models.ChildrenBook;
import com.fabulary.stories.services.ChildrenBookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
