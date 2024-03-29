package com.my_bible_note.my_bible_note.repository;

import com.my_bible_note.my_bible_note.entity.Bible;
import com.my_bible_note.my_bible_note.entity.BibleId;
import com.my_bible_note.my_bible_note.enums.Book;
import com.my_bible_note.my_bible_note.enums.Testament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BibleRepository extends JpaRepository<Bible, BibleId> {
    // Book enum을 사용하여 조회
    List<Bible> findByTestamentAndBookAndChapter(int testament, int book, int chapter);

    // Book enum과 범위를 지정하여 조회
    List<Bible> findByTestamentAndBookAndChapterAndVerseBetween(int testament, int book, int chapter, int startVerse, int endVerse);
}


