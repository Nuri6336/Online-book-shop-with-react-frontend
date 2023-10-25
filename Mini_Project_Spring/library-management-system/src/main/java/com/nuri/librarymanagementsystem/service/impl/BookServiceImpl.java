package com.nuri.librarymanagementsystem.service.impl;

import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.entity.BorrowedBookEntity;
import com.nuri.librarymanagementsystem.entity.ReserveEntity;
import com.nuri.librarymanagementsystem.entity.UserEntity;
import com.nuri.librarymanagementsystem.exception.CustomException;
import com.nuri.librarymanagementsystem.model.BookDto;
import com.nuri.librarymanagementsystem.repository.BookRepository;
import com.nuri.librarymanagementsystem.repository.BorrowedBookRepository;
import com.nuri.librarymanagementsystem.repository.ReserveRepository;
import com.nuri.librarymanagementsystem.repository.UserRepository;
import com.nuri.librarymanagementsystem.service.BookService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BorrowedBookRepository borrowedBookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReserveRepository reserveRepository;

    public void addBook(BookDto book) throws CustomException {
        ModelMapper modelMapper = new ModelMapper();
        BookEntity bookEntity = new BookEntity();
        if (book.getBookName() == null)
            throw new CustomException("Book name should be provided");
        else {
            bookEntity.setBookName(book.getBookName());
            bookEntity.setAuthorName(book.getAuthorName());
            bookEntity.setPublishedYear(book.getPublishedYear());
            bookEntity.setBookDescription(book.getBookDescription());
            bookEntity.setImgUrl(book.getImgUrl());
            bookEntity.setDetailsUrl(book.getDetailsUrl());
            bookRepository.save(bookEntity);
        }
    }

    public List<BookEntity> getAllBook(){
        return bookRepository.findAll();
    }

    public void deleteBook(Integer id) throws CustomException {
        BookEntity book = bookRepository.findById(id)
                .orElseThrow(() -> new CustomException("Book is not found here"));

        BorrowedBookEntity borrowedBook1 = borrowedBookRepository.findByBookEntity(book);

        if(borrowedBook1 != null) {
            BorrowedBookEntity borrowedBook = borrowedBookRepository.findByBookEntityAndStatus(book, "returned")
                    .orElseThrow(() -> new CustomException("You cannot delete the book"));
            borrowedBookRepository.deleteById(borrowedBook.getId());
        }

        bookRepository.deleteById(id);
    }

    public void updateBook(Integer id, BookDto book) throws CustomException {
        BookEntity existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new CustomException("There is no book belongs to this id"));

        existingBook.setBookName(book.getBookName());
        existingBook.setAuthorName(book.getAuthorName());
        existingBook.setPublishedYear(book.getPublishedYear());
        existingBook.setBookDescription(book.getBookDescription());
        existingBook.setImgUrl(book.getImgUrl());
        existingBook.setDetailsUrl(book.getDetailsUrl());

        bookRepository.save(existingBook);
    }

    public void reserveBook(Integer bookId) throws CustomException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Integer userId = user.get().getId();

        UserEntity userEntity = userRepository.getReferenceById(userId);
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException("Provide valid BookId"));
        BorrowedBookEntity borrowedBook = borrowedBookRepository.findByBookEntityAndStatus(book, "occupied")
                .orElseThrow(() -> new CustomException("You can borrow the book as it is available"));
        ReserveEntity reserveEntityExist = reserveRepository.findByUserEntityAndBookEntity(userEntity, book)
                .orElseThrow(() -> new CustomException("You have no reservation of this book"));

        ReserveEntity reserveEntity = new ReserveEntity();
        reserveEntity.setBookEntity(book);
        reserveEntity.setReservationDate(LocalDate.now());
        reserveEntity.setUserEntity(userEntity);
        reserveRepository.save(reserveEntity);
    }

    public void cancelReservation(Integer bookId) throws CustomException{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Integer userId = user.get().getId();

        UserEntity userEntity = userRepository.getReferenceById(userId);
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException("Provide valid BookId"));
        ReserveEntity reserveEntity = reserveRepository.findByUserEntityAndBookEntity(userEntity, book)
                .orElseThrow(() -> new CustomException("You have no reservation of this book"));

        reserveRepository.delete(reserveEntity);
    }

    public BookEntity getIndividualBookInfo(Integer bookId) throws CustomException {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException("Book is not found here"));
    }
}
