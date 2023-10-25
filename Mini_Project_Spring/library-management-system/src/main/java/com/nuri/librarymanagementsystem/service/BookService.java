package com.nuri.librarymanagementsystem.service;

import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.exception.CustomException;
import com.nuri.librarymanagementsystem.model.BookDto;

import java.util.List;

public interface BookService {

    void addBook(BookDto book) throws CustomException;
    void updateBook(Integer id, BookDto book) throws CustomException;
    void deleteBook(Integer id) throws CustomException;
    List<BookEntity> getAllBook();
    BookEntity getIndividualBookInfo(Integer bookId) throws CustomException;

    void reserveBook(Integer bookId) throws CustomException;
    void cancelReservation(Integer bookId) throws CustomException;
}
