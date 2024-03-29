package com.my_bible_note.my_bible_note.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "bible")
@IdClass(BibleId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bible {

    @Id
    private int testament;

    @Id
    private int book;

    @Id
    private int chapter;

    @Id
    private int verse;

    private String text;

}

