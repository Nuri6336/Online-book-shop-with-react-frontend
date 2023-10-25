package com.nuri.librarymanagementsystem.service.impl;

import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.entity.ReviewEntity;
import com.nuri.librarymanagementsystem.entity.UserEntity;
import com.nuri.librarymanagementsystem.exception.CustomException;
import com.nuri.librarymanagementsystem.model.ReviewDto;
import com.nuri.librarymanagementsystem.repository.BookRepository;
import com.nuri.librarymanagementsystem.repository.ReviewRepository;
import com.nuri.librarymanagementsystem.repository.UserRepository;
import com.nuri.librarymanagementsystem.service.ReviewService;
import jakarta.transaction.Transactional;
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
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    public ReviewRepository reviewRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    public void addReview(ReviewDto reviewDto, Integer bookId) throws CustomException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Integer userId = user.get().getId();

        UserEntity userEntity = userRepository.getReferenceById(userId);
        BookEntity book = bookRepository.findById(bookId).orElseThrow(() -> new CustomException("Provide valid BookId"));

        ReviewEntity reviewEntity = new ReviewEntity();
        reviewEntity.setReview(reviewDto.getReview());
        reviewEntity.setRatings(reviewDto.getRatings());
        reviewEntity.setReviewTime(LocalDate.now());
        reviewEntity.setBookEntity(book);
        reviewEntity.setUserEntity(userEntity);
        reviewRepository.save(reviewEntity);
    }

    public List<ReviewEntity> getReviewByBookId(Integer bookId) throws CustomException {
        BookEntity book = bookRepository.findById(bookId).orElseThrow(() -> new CustomException("Please provide valid Book ID."));
        return reviewRepository.findAllByBookEntity(book);
    }

    public void updateReview(Integer bookId, Integer reviewId, ReviewDto reviewDto) throws CustomException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Integer userId = user.get().getId();

        UserEntity userEntity = userRepository.getReferenceById(userId);
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException("Provide valid BookId"));

        ReviewEntity existingReview = reviewRepository.findByIdAndUserEntityAndBookEntity(reviewId, userEntity, book)
                .orElseThrow(() -> new CustomException("Provide valid BookId or reviewId"));

        existingReview.setReview(reviewDto.getReview());
        existingReview.setRatings(reviewDto.getRatings());
        existingReview.setReviewTime(LocalDate.now());

        reviewRepository.save(existingReview);
    }

    public void deleteReview(Integer bookId, Integer reviewId) throws CustomException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Integer userId = user.get().getId();

        UserEntity userEntity = userRepository.getReferenceById(userId);
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException("Provide valid BookId"));

        ReviewEntity existingReview = reviewRepository.findByIdAndUserEntityAndBookEntity(reviewId, userEntity, book)
                .orElseThrow(() -> new CustomException("Provide valid BookId or reviewId"));

        reviewRepository.delete(existingReview);
    }
}
