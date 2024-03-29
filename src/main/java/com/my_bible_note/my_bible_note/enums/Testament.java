package com.my_bible_note.my_bible_note.enums;

public enum Testament {
    OLD(1, "구약"),
    NEW(2, "신약");

    private final int value;
    private final String description;

    Testament(int value, String description) {
        this.value = value;
        this.description = description;
    }

    public int getValue() {
        return value;
    }

    public String getDescription() {
        return description;
    }

    public static Testament fromValue(int value) {
        for (Testament testament : Testament.values()) {
            if (testament.getValue() == value) {
                return testament;
            }
        }
        throw new IllegalArgumentException("No Testament with value " + value);
    }
}

