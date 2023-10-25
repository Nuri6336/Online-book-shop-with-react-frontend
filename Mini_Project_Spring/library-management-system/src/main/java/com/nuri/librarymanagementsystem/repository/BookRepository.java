package com.nuri.librarymanagementsystem.repository;

import com.nuri.librarymanagementsystem.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<BookEntity, Integer> {

}
