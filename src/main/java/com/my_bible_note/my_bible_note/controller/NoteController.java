package com.my_bible_note.my_bible_note.controller;

import com.my_bible_note.my_bible_note.dto.NoteDto;
import com.my_bible_note.my_bible_note.jwt.JwtTokenProvider;
import com.my_bible_note.my_bible_note.service.NoteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping
    public NoteDto createNote(@RequestBody NoteDto noteDto, HttpServletRequest request) {
        int memberNo = JwtTokenProvider.getUserNoFromToken(JwtTokenProvider.resolveToken(request));

        return noteService.createNote(noteDto, memberNo);
    }

    @GetMapping
    public List<NoteDto> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/me")
    public List<NoteDto> getNotes(HttpServletRequest request) {
        int memberNo = JwtTokenProvider.getUserNoFromToken(JwtTokenProvider.resolveToken(request));
        System.out.println(noteService.getNotesByMemberNo(memberNo));
        return noteService.getNotesByMemberNo(memberNo);
    }


    @GetMapping("/{noteNo}")
    public NoteDto getNoteById(@PathVariable int noteNo, HttpServletRequest request) {
        int memberNo = JwtTokenProvider.getUserNoFromToken(JwtTokenProvider.resolveToken(request));

        return noteService.getNoteById(noteNo, memberNo);
    }

    @PutMapping
    public NoteDto updateNote(@RequestBody NoteDto noteDto, HttpServletRequest request) {
        int memberNo = JwtTokenProvider.getUserNoFromToken(JwtTokenProvider.resolveToken(request));

        return noteService.updateNote(noteDto, memberNo);
    }

    @DeleteMapping("/{noteNo}")
    public void deleteNote(@PathVariable int noteNo, HttpServletRequest request) {
        int memberNo = JwtTokenProvider.getUserNoFromToken(JwtTokenProvider.resolveToken(request));

        noteService.deleteNote(noteNo, memberNo);
    }
}

