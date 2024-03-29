package com.my_bible_note.my_bible_note.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "note")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noteNo;

    @ManyToOne
    @JoinColumn(name = "member_no")
    private Member member;
    private int book;
    private int chapter;
    private int startVerse;
    private int endVerse;
    private int cat;
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date regDtm;

    @PrePersist
    protected void onCreate() {
        regDtm = new Date();
    }
}
