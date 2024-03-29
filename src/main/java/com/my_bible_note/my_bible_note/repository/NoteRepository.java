package com.my_bible_note.my_bible_note.repository;

import com.my_bible_note.my_bible_note.entity.Note;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByMember_MemberNo(int memberNo, Sort sort);



}
