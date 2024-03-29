package com.my_bible_note.my_bible_note.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@AllArgsConstructor
public class BibleDTO {

    private int testament;
    private BookDTO book;
    private int chapter;
    private int verse;
    private String text;

}
