package com.nuri.librarymanagementsystem.controller;

import com.nuri.librarymanagementsystem.entity.ReviewEntity;
import com.nuri.librarymanagementsystem.exception.CustomException;
import com.nuri.librarymanagementsystem.model.ReviewDto;
import com.nuri.librarymanagementsystem.service.ReviewService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/books")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/{bookId}/reviews/create")
    public String addReview(@PathVariable Integer bookId, @RequestBody ReviewDto review) throws CustomException {
        reviewService.addReview(review, bookId);
        return "Review has been uploaded";
    }

    @PutMapping("/{bookId}/reviews/{reviewId}/update")
    public String updateReview(@PathVariable Integer bookId,
                               @PathVariable Integer reviewId, @RequestBody ReviewDto review) throws CustomException {
        reviewService.updateReview(bookId, reviewId, review);
        return "Review has been updated.";
    }

    @DeleteMapping("/{bookId}/reviews/{reviewId}/delete")
    public String deleteReview(@PathVariable Integer bookId, @PathVariable Integer reviewId) throws CustomException {
        reviewService.deleteReview(bookId, reviewId);
        return "Review has been deleted successfully.";
    }

    @GetMapping("/{bookId}/reviews")
    public ResponseEntity<List<ReviewDto>> getAllReview(@PathVariable Integer bookId) throws CustomException {
        List<ReviewEntity> reviews = reviewService.getReviewByBookId(bookId);

        ModelMapper modelMapper = new ModelMapper();
        List<ReviewDto> returnedValue = new ArrayList<>();
        for (ReviewEntity review: reviews) {
            returnedValue.add(modelMapper.map(review,ReviewDto.class));
        }
        return new ResponseEntity<>(returnedValue, HttpStatus.OK);
    }

}
