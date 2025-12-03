package com.fabulary.stories.services;

import com.fabulary.stories.exceptions.ResourceNotFoundException;
import com.fabulary.stories.models.Story;
import com.fabulary.stories.repository.StoryRepository;
import com.fabulary.stories.events.StoryCreatedEvent;
import com.fabulary.stories.events.StoryProducer;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;

@Service
public class StoryService {

    private final StoryRepository repository;
    private final StoryProducer producer;

    // Injetamos o StoryProducer (o carteiro)
    public StoryService(StoryRepository repository, StoryProducer producer) {
        this.repository = repository;
        this.producer = producer;
    }

    public Story create(Story story) {
        Story saved = repository.save(story);

        // Cria o "conteúdo da carta" (evento para o Kafka)
        StoryCreatedEvent event = new StoryCreatedEvent(
                saved.getId(),
                saved.getTitle(),
                saved.getContent(),
                1L, // futuramente: ID do autor (ex: extraído do token JWT)
                Instant.now()
        );

        //  O "carteiro" leva a carta até a caixa de correio (Kafka)
        producer.publishCreated(event);

        return saved;
    }

    public List<Story> findAll() {
        // Recupera todos os contos do banco sem enviar nada ao Kafka
        return repository.findAll();
    }

    public Story findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id: " + id));
    }

    public void delete(Long id) {
        Story story = findById(id); // garante que existe, senão lança exceção
        repository.delete(story);
    }
}