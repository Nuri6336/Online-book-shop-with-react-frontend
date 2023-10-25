package com.nuri.librarymanagementsystem.repository;

import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.entity.BorrowedBookEntity;
import com.nuri.librarymanagementsystem.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BorrowedBookRepository extends JpaRepository<BorrowedBookEntity, Integer> {

    BorrowedBookEntity findByBookEntity(BookEntity bookEntity);

    Optional<BorrowedBookEntity> findByBookEntityAndStatus(BookEntity bookEntity, String status);

    BorrowedBookEntity findByUserEntityAndBookEntityAndStatus(UserEntity userEntity, BookEntity bookEntity, String status);

    List<BorrowedBookEntity> findAllByUserEntity(UserEntity userEntity);

    List<BorrowedBookEntity> findAllByUserEntityAndStatus(UserEntity userEntity, String status);

}
