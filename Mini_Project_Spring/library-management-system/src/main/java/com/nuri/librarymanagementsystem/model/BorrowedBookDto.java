package com.nuri.librarymanagementsystem.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowedBookDto {

    private Integer id;
    private LocalDate borrowedDate;
    private LocalDate dueDate;
}
