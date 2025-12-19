package com.fabulary.stories.enums;

public enum AgeRange {
    THREE_TO_FIVE("THREE TO FIVE"),
    SIX_TO_EIGHT("SIX TO EIGHT"),
    NINE_TO_TWELVE("NINE TO TWELVE");

    private final String value;

    AgeRange(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
