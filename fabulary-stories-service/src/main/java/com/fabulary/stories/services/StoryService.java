package com.fabulary.stories.services;

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

    // 🧰 Injetamos o StoryProducer (o carteiro)
    public StoryService(StoryRepository repository, StoryProducer producer) {
        this.repository = repository;
        this.producer = producer;
    }

    public Story create(Story story) {
       //salva no banco primeiro o conto
        Story saved = repository.save(story);

        // ✉️ 2. Depois, criamos o "conteúdo da carta" (o evento que será enviado ao Kafka).
        StoryCreatedEvent event = new StoryCreatedEvent(
                saved.getId(),
                saved.getTitle(),
                saved.getContent(),
                1L, // aqui futuramente pode ser o ID do autor (por exemplo o codigo vindo do token JWT)
                Instant.now()
        );

        // 🚚 3. agora o "carteiro" (producer) leva a carta até a "caixa de correio" story.created.
        producer.publishCreated(event);

        return saved;
    }
    public List<Story> findAll() {
        // 🔍 aqui pra recuperar todos os contos do banco sem enviar nada ao Kafka
        return repository.findAll();
    }
}