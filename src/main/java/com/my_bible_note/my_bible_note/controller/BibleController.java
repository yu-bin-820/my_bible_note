package com.my_bible_note.my_bible_note.controller;

import com.my_bible_note.my_bible_note.dto.BibleDTO;
import com.my_bible_note.my_bible_note.dto.BookDTO;
import com.my_bible_note.my_bible_note.entity.Bible;
import com.my_bible_note.my_bible_note.enums.Book;
import com.my_bible_note.my_bible_note.enums.Testament;
import com.my_bible_note.my_bible_note.service.BibleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/bible")
public class BibleController {

    private final BibleService bibleService;

    @Autowired
    public BibleController(BibleService bibleService) {
        this.bibleService = bibleService;
    }


    @GetMapping("/book/chapter/verses/{book}/{chapter}")
    public List<BibleDTO> getVersesByChapter(@PathVariable("book") int bookValue, @PathVariable("chapter") int chapter) {
        Book book = Book.fromValue(bookValue);
        Testament testament = book.getTestament();

        return bibleService.getVersesByChapter(testament, book, chapter);
    }


    @GetMapping("/books")
    public ResponseEntity<List<BookDTO>> getBooksByTestament() {
        List<BookDTO> books = bibleService.getBooks();
        return ResponseEntity.ok(books);
    }
}

