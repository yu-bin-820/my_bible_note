package com.my_bible_note.my_bible_note.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.my_bible_note.my_bible_note.enums.Book;
import com.my_bible_note.my_bible_note.enums.Testament;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    private int value;
    private String description;
    private Testament testament;
    private int chapters;




    public static BookDTO fromBook(Book book) {
        return new BookDTO(book.getValue(), book.getDescription(), book.getTestament(), book.getChapters());
    }


    @JsonCreator
    public static BookDTO fromValue(@JsonProperty("value") int value) {

        Book book = Book.fromValue(value);
        return fromBook(book);
    }

}

