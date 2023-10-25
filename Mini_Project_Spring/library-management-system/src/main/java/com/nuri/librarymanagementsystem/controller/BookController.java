package com.nuri.librarymanagementsystem.controller;

import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.exception.CustomException;
import com.nuri.librarymanagementsystem.model.BookDto;
import com.nuri.librarymanagementsystem.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @PostMapping("/create")
    public String createNewBook(@RequestBody BookDto book) throws CustomException {
        bookService.addBook(book);
        return "Book added to database";
    }

    @PutMapping("/update/{bookId}")
    public String updateBook(@PathVariable Integer bookId, @RequestBody BookDto book) throws CustomException {
        bookService.updateBook(bookId, book);
        return "Data has been updated";
    }

    @DeleteMapping("/delete/{bookId}")
    public String deleteBook(@PathVariable Integer bookId) throws CustomException {
        bookService.deleteBook(bookId);
        return "Book is removed from the database";
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookEntity>> getAllBookInfo(){
        return new ResponseEntity(bookService.getAllBook(), HttpStatus.OK );
    }

    @PostMapping("/{bookId}/reserve")
    public String reserveBook(@PathVariable Integer bookId) throws CustomException{
        bookService.reserveBook(bookId);
        return "Book has been reserved of id " + bookId;
    }

    @DeleteMapping("/{bookId}/cancel-reservation")
    public String cancelReservationBook(@PathVariable Integer bookId) throws CustomException{
        bookService.cancelReservation(bookId);
        return "Reservation has been canceled.";
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookEntity> getIndividualBookInfo(@PathVariable Integer bookId) throws CustomException {
        return new ResponseEntity(bookService.getIndividualBookInfo(bookId), HttpStatus.OK );
    }

}
