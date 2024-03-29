package com.my_bible_note.my_bible_note.service;

import com.my_bible_note.my_bible_note.dto.BibleDTO;
import com.my_bible_note.my_bible_note.dto.BookDTO;
import com.my_bible_note.my_bible_note.dto.NoteDto;
import com.my_bible_note.my_bible_note.entity.Bible;
import com.my_bible_note.my_bible_note.entity.Note;
import com.my_bible_note.my_bible_note.enums.Book;
import com.my_bible_note.my_bible_note.enums.Testament;
import com.my_bible_note.my_bible_note.repository.BibleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BibleService {

    private final BibleRepository bibleRepository;

    @Autowired
    public BibleService(BibleRepository bibleRepository) {
        this.bibleRepository = bibleRepository;
    }

    private BibleDTO coverToDTO(Bible bible) {

        BibleDTO bibleDTO = new BibleDTO();
        bibleDTO.setTestament(bible.getTestament());
        bibleDTO.setBook(BookDTO.fromBook(Book.fromValue(bible.getBook())));
        bibleDTO.setChapter(bible.getChapter());
        bibleDTO.setVerse(bible.getVerse());
        bibleDTO.setText(bible.getText());
        System.out.println(bibleDTO);

        return bibleDTO;
    }


    public List<BibleDTO> getVersesByChapter(Testament testament, Book book, int chapter) {

        System.out.println(testament.getValue());
        System.out.println(book.getValue());
        System.out.println(chapter);


        return bibleRepository.findByTestamentAndBookAndChapter(testament.getValue(), book.getValue(), chapter).stream()
                .map(this::coverToDTO)
                .collect(Collectors.toList());
    }


    public List<BookDTO> getBooks() {

        return Arrays.stream(Book.values())
                .map(BookDTO::fromBook)
                .collect(Collectors.toList());
    }
}

