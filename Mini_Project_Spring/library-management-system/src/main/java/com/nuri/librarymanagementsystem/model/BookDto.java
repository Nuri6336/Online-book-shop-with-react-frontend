package com.nuri.librarymanagementsystem.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private Integer id;
    private String bookName;
    private String authorName;
    private String publishedYear;
    private String bookDescription;
    private String imgUrl;
    private String detailsUrl;
}
