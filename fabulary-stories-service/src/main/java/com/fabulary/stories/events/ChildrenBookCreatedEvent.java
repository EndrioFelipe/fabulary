package com.fabulary.stories.events;

import com.fabulary.stories.enums.AgeRange;
import com.fabulary.stories.enums.BookStatus;

import java.math.BigDecimal;

public record ChildrenBookCreatedEvent(Long id,

                                       String title,

                                       String content,

                                       AgeRange authorName,

                                       BookStatus status,

                                       BigDecimal value) {


}
