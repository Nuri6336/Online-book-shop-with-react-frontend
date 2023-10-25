package com.nuri.librarymanagementsystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nuri.librarymanagementsystem.constants.AppConstants;
import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.entity.BorrowedBookEntity;
import com.nuri.librarymanagementsystem.entity.UserEntity;
import com.nuri.librarymanagementsystem.exception.CustomException;
import com.nuri.librarymanagementsystem.model.BorrowedBookDto;
import com.nuri.librarymanagementsystem.model.UserDto;
import com.nuri.librarymanagementsystem.model.UserLoginRequestDto;
import com.nuri.librarymanagementsystem.service.UserService;
import com.nuri.librarymanagementsystem.utils.JWTUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody UserDto userDto) {
        try {
            UserDto createdUser = userService.createUser(userDto);
            String accessToken = JWTUtils.generateToken(createdUser.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("user", createdUser);
            response.put(AppConstants.HEADER_STRING, AppConstants.TOKEN_PREFIX + accessToken);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public void login(@RequestBody UserLoginRequestDto userLoginRequestModel, HttpServletResponse response) throws IOException{
        try{

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userLoginRequestModel.getEmail(), userLoginRequestModel.getPassword()));

            if (authentication.isAuthenticated()) {
                UserDto userDto = userService.getUser(userLoginRequestModel.getEmail());
                String accessToken = JWTUtils.generateToken(userDto.getEmail());

                Map<String, Object> responseBody = new HashMap<>();
                responseBody.put(AppConstants.HEADER_STRING, AppConstants.TOKEN_PREFIX + accessToken);
                responseBody.put("userId", userDto.getUserId());
                responseBody.put("email", userDto.getEmail());
                responseBody.put("role", userDto.getRole());
                responseBody.put("id",userDto.getId());

                response.setContentType("application/json");
                response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
            }
            }catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", e.getMessage());
                errorResponse.put("message", "Invalid email or password");
                ObjectMapper objectMapper = new ObjectMapper();
                String errorResponseJson = objectMapper.writeValueAsString(errorResponse);
                response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserDetails(@PathVariable String userId) throws CustomException {
        UserDto user = userService.getUserByUserId(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("FirstName", user.getFirstName());
        response.put("LastName", user.getLastName());
        response.put("Email", user.getEmail());
        response.put("Address", user.getAddress());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{userId}/books")
    public ResponseEntity<List<BorrowedBookDto>> getAllBorrowedBooksInfo(@PathVariable Integer userId) throws CustomException {
        List<BorrowedBookEntity> book = userService.getBorrowedBook(userId);

        ModelMapper modelMapper = new ModelMapper();
        List<BorrowedBookDto> returnedValue = new ArrayList<>();
        for (BorrowedBookEntity borrowedBook: book) {
            returnedValue.add(modelMapper.map(borrowedBook,BorrowedBookDto.class));
        }
        return new ResponseEntity<>(returnedValue, HttpStatus.OK);
    }

    @GetMapping("/{userId}/borrowed-books")
    public ResponseEntity<List<BorrowedBookDto>> getAllCurrentBorrowedBooksInfo(@PathVariable Integer userId) throws CustomException {
        List<BorrowedBookEntity> book = userService.getCurrentBorrowedBook(userId);

        ModelMapper modelMapper = new ModelMapper();
        List<BorrowedBookDto> returnedValue = new ArrayList<>();
        for (BorrowedBookEntity borrowedBook: book) {
            returnedValue.add(modelMapper.map(borrowedBook,BorrowedBookDto.class));
        }
        return new ResponseEntity<>(returnedValue, HttpStatus.OK);
    }

    //new
    @GetMapping("/history")
    public ResponseEntity<?> getBorrowedHistoryByUser(){
        List<BorrowedBookEntity> book = userService.getUserHistory();

        ModelMapper modelMapper = new ModelMapper();
        List<BorrowedBookDto> returnedValue = new ArrayList<>();

        for (BorrowedBookEntity borrowedBook: book) {
            returnedValue.add(modelMapper.map(borrowedBook,BorrowedBookDto.class));
        }

        return new ResponseEntity<>(returnedValue, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserEntity>> getAllBookInfo(){
        return new ResponseEntity(userService.getAllUsers(), HttpStatus.OK );
    }
}
