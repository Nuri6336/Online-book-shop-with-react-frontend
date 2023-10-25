package com.nuri.librarymanagementsystem.service;

import com.nuri.librarymanagementsystem.entity.ReviewEntity;
import com.nuri.librarymanagementsystem.exception.CustomException;
import com.nuri.librarymanagementsystem.model.ReviewDto;

import java.util.List;

public interface ReviewService {

    void addReview(ReviewDto reviewDto, Integer bookId) throws CustomException;
    List<ReviewEntity> getReviewByBookId(Integer bookId) throws CustomException;
    void updateReview(Integer bookId, Integer reviewId, ReviewDto reviewDto) throws CustomException;
    void deleteReview(Integer bookId, Integer reviewId) throws CustomException;
}
