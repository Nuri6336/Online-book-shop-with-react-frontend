package com.nuri.librarymanagementsystem.controller;


import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.exception.CustomException;
import com.nuri.librarymanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/books")
public class BorrowedBookController {

    @Autowired
    public UserService userService;

    @PostMapping("/{bookId}/borrow")
    public String borrowingBook(@PathVariable Integer bookId) throws CustomException {
        userService.borrowedBookById(bookId);
        return "Please return the book within the due date";
    }

    @PutMapping("/{bookId}/return")
    public String returnBook(@PathVariable Integer bookId) throws CustomException {
        userService.returnBook(bookId);
        return "Book has been returned by user";
    }

    @GetMapping("/{bookId}/check")
    public String checkBookAvailable(@PathVariable Integer bookId) throws CustomException {
        return userService.checkBookAvailability(bookId);
    }

    @GetMapping("/{userId}/occupied-book")
    public List<BookEntity> occupiedBook(@PathVariable Integer userId) throws CustomException {
        return userService.occupiedBook(userId);
    }
}
