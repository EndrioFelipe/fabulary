package com.fabulary.stories.repository;

import com.fabulary.stories.models.ChildrenBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildrenBookRepository extends JpaRepository<ChildrenBook, Long> {
}
