package com.my_bible_note.my_bible_note.dto;

import com.my_bible_note.my_bible_note.entity.Member;
import com.my_bible_note.my_bible_note.enums.Book;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class NoteDto {

    private int noteNo;
    private Member member;
    private BookDTO book;
    private int chapter;
    private int startVerse;
    private int endVerse;
    private int cat;
    private String content;
    private Date regDtm;
    private List<BibleVerseDTO> verses;

    public NoteDto(int noteNo, Member member, Book book, int chapter, int startVerse, int endVerse, int cat, String content, Date regDtm) {
    }
}
