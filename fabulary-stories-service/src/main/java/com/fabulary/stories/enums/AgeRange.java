package com.fabulary.stories.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum AgeRange {
    THREE_TO_FIVE("THREE_TO_FIVE"),
    SIX_TO_EIGHT("SIX_TO_EIGHT"),
    NINE_TO_TWELVE("NINE_TO_TWELVE");

    private final String value;

    AgeRange(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static AgeRange fromValue(String value) {
        return AgeRange.valueOf(value);
    }
}
