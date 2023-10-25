package com.nuri.librarymanagementsystem.repository;

import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.entity.ReserveEntity;
import com.nuri.librarymanagementsystem.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReserveRepository extends JpaRepository<ReserveEntity, Integer> {

    Optional<ReserveEntity> findByUserEntityAndBookEntity(UserEntity userEntity, BookEntity bookEntity);

    Optional<ReserveEntity> findByBookEntity(BookEntity bookEntity);

}
