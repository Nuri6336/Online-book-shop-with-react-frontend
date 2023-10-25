package com.nuri.librarymanagementsystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleDataNotExists(CustomException dataNotFound)
    {
        return new ResponseEntity<>(dataNotFound.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
