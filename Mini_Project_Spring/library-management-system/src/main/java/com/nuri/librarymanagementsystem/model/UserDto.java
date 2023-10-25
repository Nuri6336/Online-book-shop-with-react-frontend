package com.nuri.librarymanagementsystem.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Integer id;
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String role;

    public void setAccessToken(String s) {
    }
}
