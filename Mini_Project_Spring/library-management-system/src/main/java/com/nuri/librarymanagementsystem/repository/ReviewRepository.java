package com.nuri.librarymanagementsystem.repository;

import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.entity.ReviewEntity;
import com.nuri.librarymanagementsystem.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {

    List<ReviewEntity> findAllByBookEntity(BookEntity book);

    Optional<ReviewEntity> findByIdAndUserEntityAndBookEntity(Integer reviewId, UserEntity user, BookEntity book);
}
