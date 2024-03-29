package com.my_bible_note.my_bible_note.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@AllArgsConstructor
public class BibleVerseDTO {

    private int verse;
    private String text;

}
