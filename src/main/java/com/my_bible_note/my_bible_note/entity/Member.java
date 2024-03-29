package com.my_bible_note.my_bible_note.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Entity
@Table(name = "member")
@Getter
@Setter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberNo;

    private long memberId;
    private int markTestament = 1;
    private int markBook = 1;
    private int markChapter = 1;
    private int markVerse = 1;


}
