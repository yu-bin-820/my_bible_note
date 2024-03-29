package com.my_bible_note.my_bible_note.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@AllArgsConstructor
public class MemberMarkDto {

    private int memberNo;
    private int markTestament;
    private int markBook;
    private int markChapter;
    private int markVerse;

}
