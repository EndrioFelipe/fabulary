package com.fabulary.stories.models;

import com.fabulary.stories.enums.AgeRange;
import com.fabulary.stories.enums.BookStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "childrenbook")
public class ChildrenBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private AgeRange authorName;

    private BookStatus status;

    private BigDecimal value;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public AgeRange getAuthorName() {
        return authorName;
    }

    public void setAuthorName(AgeRange authorName) {
        this.authorName = authorName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public BookStatus getStatus() {
        return status;
    }

    public void setStatus(BookStatus status) {
        this.status = status;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }
}
