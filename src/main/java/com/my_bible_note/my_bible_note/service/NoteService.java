package com.my_bible_note.my_bible_note.service;

import com.my_bible_note.my_bible_note.dto.BibleVerseDTO;
import com.my_bible_note.my_bible_note.dto.BookDTO;
import com.my_bible_note.my_bible_note.entity.Bible;
import com.my_bible_note.my_bible_note.entity.Member;
import com.my_bible_note.my_bible_note.entity.Note;
import com.my_bible_note.my_bible_note.dto.NoteDto;
import com.my_bible_note.my_bible_note.enums.Book;
import com.my_bible_note.my_bible_note.repository.BibleRepository;
import com.my_bible_note.my_bible_note.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private BibleRepository bibleRepository;

    // DTO를 엔티티로 변환하는 메서드
    private Note convertToEntity(NoteDto noteDto) {
        Note note = new Note();
        note.setNoteNo(noteDto.getNoteNo());
        note.setMember(noteDto.getMember());
        note.setBook(noteDto.getBook().getValue());
        note.setChapter(noteDto.getChapter());
        note.setStartVerse(noteDto.getStartVerse());
        note.setEndVerse(noteDto.getEndVerse());
        note.setCat(noteDto.getCat());
        note.setContent(noteDto.getContent());
        note.setRegDtm(noteDto.getRegDtm());
        return note;
    }

    // 엔티티를 DTO로 변환하는 메서드
    private NoteDto convertToDto(Note note) {

        NoteDto noteDto = new NoteDto();
        noteDto.setNoteNo(note.getNoteNo());
        noteDto.setMember(note.getMember());
        noteDto.setBook(BookDTO.fromBook(Book.fromValue(note.getBook())));
        noteDto.setChapter(note.getChapter());
        noteDto.setStartVerse(note.getStartVerse());
        noteDto.setEndVerse(note.getEndVerse());
        noteDto.setCat(note.getCat());
        noteDto.setContent(note.getContent());
        noteDto.setRegDtm(note.getRegDtm());
        System.out.println(noteDto);


        return noteDto;
    }

    public NoteDto createNote(NoteDto noteDto, int memberNo) {
        Note note = convertToEntity(noteDto);
        Member member = new Member();
        member.setMemberNo(memberNo);
        note.setMember(member);
        Note savedNote = noteRepository.save(note);
        return convertToDto(savedNote);
    }

    public List<NoteDto> getAllNotes() {
        return noteRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<NoteDto> getNotesByMemberNo(int memberNo) {

        return noteRepository.findByMember_MemberNo(memberNo, Sort.by("regDtm").descending()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public NoteDto getNoteById(int noteNo, int memberNo) {
        Note note = noteRepository.findById(noteNo)
                .orElseThrow(() -> new IllegalArgumentException("Invalid noteNo"));
        if( note.getMember().getMemberNo()!=memberNo){
            new IllegalArgumentException("Not authorized");
        }

        NoteDto noteDto = convertToDto(note);

        List<Bible> bibles = bibleRepository.findByTestamentAndBookAndChapterAndVerseBetween(Book.fromValue(note.getBook()).getTestament().getValue(), note.getBook(), note.getChapter(), note.getStartVerse(), note.getEndVerse());

        // 가져온 구절들을 BibleVerseDTO 객체로 변환
        List<BibleVerseDTO> verseDTOs = bibles.stream()
                .map(bible -> new BibleVerseDTO(bible.getVerse(), bible.getText()))
                .collect(Collectors.toList());

        noteDto.setVerses(verseDTOs);

        return noteDto;
    }

    public NoteDto updateNote(NoteDto noteDto, int memberNo) {
        Note existingNote = noteRepository.findById(noteDto.getNoteNo())
                .orElseThrow(() -> new IllegalArgumentException("Invalid noteNo"));

        if( (existingNote.getMember().getMemberNo())!=memberNo ){
            throw new IllegalArgumentException("Not authorized");
        }

        Member member = new Member();
        member.setMemberNo(memberNo);
        noteDto.setMember(member);
        Note updatedNote = convertToEntity(noteDto);
        updatedNote = noteRepository.save(updatedNote);
        return convertToDto(updatedNote);
    }

    public void deleteNote(int noteNo, int memberNo) {
        Note existingNote = noteRepository.findById(noteNo)
                .orElseThrow(() -> new IllegalArgumentException("Invalid noteNo"));

        if( (existingNote.getMember().getMemberNo())!=memberNo ){
            throw new IllegalArgumentException("Not authorized");
        }

        noteRepository.deleteById(noteNo);
    }
}

