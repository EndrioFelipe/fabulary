package com.fabulary.stories.repository;

import com.fabulary.stories.enums.AgeRange;
import com.fabulary.stories.models.ChildrenBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ChildrenBookRepository extends JpaRepository<ChildrenBook, Long> {


    @Query("""
        SELECT b
        FROM ChildrenBook b
        WHERE (:title IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%')))
          AND (:authorName IS NULL OR LOWER(b.authorName) LIKE LOWER(CONCAT('%', :authorName, '%')))
          AND (
               :value IS NULL OR
               CAST(b.value AS string) LIKE CONCAT(:value, '%')
          )
          AND (:ageRange IS NULL OR b.ageRange = :ageRange)
    """)
    List<ChildrenBook> filter(
            @Param("title") String title,
            @Param("authorName") String authorName,
            @Param("value") BigDecimal value,
            @Param("ageRange") AgeRange ageRange
    );



}
