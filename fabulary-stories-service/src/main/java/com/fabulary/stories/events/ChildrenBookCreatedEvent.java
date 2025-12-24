package com.fabulary.stories.events;

import com.fabulary.stories.enums.AgeRange;
import com.fabulary.stories.enums.BookStatus;

import java.math.BigDecimal;

public record ChildrenBookCreatedEvent(Long id,

                                       String title,

                                       String content,

                                       String authorName,

                                       BookStatus status,

                                       BigDecimal value,

                                       AgeRange ageRange) {


}
