package com.nuri.librarymanagementsystem.service.impl;

import com.nuri.librarymanagementsystem.constants.AppConstants;
import com.nuri.librarymanagementsystem.entity.BookEntity;
import com.nuri.librarymanagementsystem.entity.BorrowedBookEntity;
import com.nuri.librarymanagementsystem.entity.UserEntity;
import com.nuri.librarymanagementsystem.exception.CustomException;
import com.nuri.librarymanagementsystem.model.UserDto;
import com.nuri.librarymanagementsystem.repository.BookRepository;
import com.nuri.librarymanagementsystem.repository.BorrowedBookRepository;
import com.nuri.librarymanagementsystem.repository.UserRepository;
import com.nuri.librarymanagementsystem.service.UserService;
import com.nuri.librarymanagementsystem.utils.JWTUtils;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BorrowedBookRepository borrowedBookRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDto createUser(UserDto user) throws Exception {
        if(userRepository.findByEmail(user.getEmail()).isPresent())
            throw new Exception("Record already exists");

        ModelMapper modelMapper = new ModelMapper();

        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        String publicUserId = JWTUtils.generateUserID(10);
        userEntity.setUserId(publicUserId);
        userEntity.setAddress(user.getAddress());
        userEntity.setRole("CUSTOMER");
        UserEntity storedUserDetails = userRepository.save(userEntity);

        UserDto returnedValue = modelMapper.map(storedUserDetails,UserDto.class);
        String accessToken = JWTUtils.generateToken(userEntity.getEmail());
        returnedValue.setAccessToken(AppConstants.TOKEN_PREFIX + accessToken);
        return returnedValue;
    }

    @Override
    public UserDto getUser(String email) throws UsernameNotFoundException{
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        UserDto returnValue = new UserDto();
        BeanUtils.copyProperties(userEntity,returnValue);
        return returnValue;
    }

    @Override
    public UserDto getUserByUserId(String userId) throws CustomException {
        UserDto returnValue = new UserDto();
        UserEntity userEntity = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException("User not found for userId: " + userId));

        BeanUtils.copyProperties(userEntity,returnValue);
        return returnValue;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Incorrect information"));

        return new User(userEntity.getEmail(),userEntity.getPassword(),
                true,true,true,true,new ArrayList<>());
    }

    @Override
    public List<BorrowedBookEntity> getBorrowedBook(Integer userId) throws CustomException {
        Optional<UserEntity> userEntity = userRepository.findById(userId);
        UserEntity userEntity1 = userEntity
                .orElseThrow(() -> new CustomException("Id not valid"));

        return borrowedBookRepository.findAllByUserEntity(userEntity1);
    }

    @Override
    public List<BorrowedBookEntity> getCurrentBorrowedBook(Integer userId) throws CustomException {
        Optional<UserEntity> userEntity = userRepository.findById(userId);
        UserEntity userEntity1 = userEntity
                .orElseThrow(() -> new CustomException("Id not valid"));

        return borrowedBookRepository.findAllByUserEntityAndStatus(userEntity1, "occupied");
    }

    public void borrowedBookById(Integer bookId) throws CustomException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Integer userId = user.get().getId();

        UserEntity userEntity = userRepository.getReferenceById(userId);
        BookEntity book = bookRepository.findById(bookId).orElseThrow(() -> new CustomException("Provide valid BookId"));

        Optional<BorrowedBookEntity> bookEntityOptional = borrowedBookRepository.findByBookEntityAndStatus(book, "occupied");

        if(bookEntityOptional.isPresent()){
            throw new CustomException("Book has been occupied");
        }
        else {
            BorrowedBookEntity borrowedBookEntity = new BorrowedBookEntity();
            borrowedBookEntity.setBorrowedDate(LocalDate.now());
            borrowedBookEntity.setDueDate(null);
            borrowedBookEntity.setStatus("occupied");
            borrowedBookEntity.setUserEntity(userEntity);
            borrowedBookEntity.setBookEntity(book);
            borrowedBookRepository.save(borrowedBookEntity);
        }
    }

    public void returnBook(Integer bookId) throws CustomException {
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException("Provide valid BookId"));

        BorrowedBookEntity borrowedBookChecked = borrowedBookRepository.findByBookEntityAndStatus(book, "occupied").orElseThrow(() -> new CustomException("Already in the store"));
        borrowedBookChecked.setDueDate(LocalDate.now());
        borrowedBookChecked.setStatus("returned");
    }

    public List<BorrowedBookEntity> getUserHistory(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Integer userId = user.get().getId();

        UserEntity userEntity = userRepository.getReferenceById(userId);

        return borrowedBookRepository.findAllByUserEntity(userEntity);
    }

    public List<UserEntity> getAllUsers(){
        return userRepository.findAllByRole("CUSTOMER");
    }

    public String checkBookAvailability(Integer bookId) throws CustomException {
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException("Provide valid BookId"));

        Optional<BorrowedBookEntity> borrowedBookChecked = borrowedBookRepository.findByBookEntityAndStatus(book, "occupied");
        if (borrowedBookChecked.isPresent()){
            return "true";
        }else {
            return "false";
        }
    }

    public List<BookEntity> occupiedBook(Integer userId) throws CustomException {
        List<BorrowedBookEntity> borrowedBookEntities = getCurrentBorrowedBook(userId);
        List<BookEntity> occupiedBooks = new ArrayList<>();

        for (BorrowedBookEntity borrowedBook : borrowedBookEntities) {
            BookEntity bookEntity = borrowedBook.getBookEntity();

            Optional<BookEntity> bookOptional = bookRepository.findById(bookEntity.getId());
            if (bookOptional.isPresent()) {
                BookEntity book = bookOptional.get();
                occupiedBooks.add(book);
            }
        }

        return occupiedBooks;
    }
}
