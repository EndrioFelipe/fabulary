package com.fabulary.stories.services;

import com.fabulary.stories.enums.BookStatus;
import com.fabulary.stories.events.ChildrenBookCreatedEvent;
import com.fabulary.stories.events.ChildrenBookProducer;
import com.fabulary.stories.models.ChildrenBook;
import com.fabulary.stories.repository.ChildrenBookRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ChildrenBookService {

    private final ChildrenBookRepository repository;
    private final ChildrenBookProducer producer;

    public ChildrenBookService(ChildrenBookRepository repository,
            ChildrenBookProducer producer
    ) {
        this.repository = repository;
        this.producer = producer;
    }

    public ChildrenBook create(ChildrenBook childrenBook) {
        ChildrenBook saved = repository.save(childrenBook);

        ChildrenBookCreatedEvent event = new ChildrenBookCreatedEvent(
                saved.getId(),
                saved.getTitle(),
                saved.getContent(),
                saved.getAuthorName(),
                BookStatus.PUBLISHED,
                new BigDecimal(1),
                saved.getAgeRange()
        );

        producer.publishCreated(event);

        return saved;
    }

    public List<ChildrenBook> findAll() {
        // Recupera todos os contos do banco sem enviar nada ao Kafka
        return repository.findAll();
    }

//    public Story findById(Long id) {
//        return repository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id: " + id));
//    }
//
//    public void delete(Long id) {
//        Story story = findById(id); // garante que existe, senão lança exceção
//        repository.delete(story);
//    }

}
