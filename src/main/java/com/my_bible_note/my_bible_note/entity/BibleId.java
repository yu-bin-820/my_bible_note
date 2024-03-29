package com.my_bible_note.my_bible_note.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class BibleId implements Serializable {
    private int testament;
    private int book;
    private int chapter;
    private int verse;

}


