package com.nuri.librarymanagementsystem.security;

import com.nuri.librarymanagementsystem.constants.AppConstants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager)
            throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth->{
                    auth
                            .requestMatchers(HttpMethod.POST, AppConstants.SIGN_IN,AppConstants.SIGN_UP).permitAll()
                            .requestMatchers(HttpMethod.GET,"/users/history").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.GET,"/users/{userId}").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/users/all").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/users/{bookId}").hasAnyRole("ADMIN","CUSTOMER")
                            .requestMatchers(HttpMethod.GET,"/users/{userId}/books").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/users/{userId}/borrowed-books").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST,"/books/create").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT,"/books/update/{bookId}").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE,"/books/delete/{bookId}").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/books/all").hasAnyRole("ADMIN","CUSTOMER")
                            .requestMatchers(HttpMethod.GET,"/books/{bookId}/check").hasAnyRole("CUSTOMER","ADMIN")
                            .requestMatchers(HttpMethod.GET,"/books/{bookId}/occupied-book").hasAnyRole("CUSTOMER","ADMIN")
                            .requestMatchers(HttpMethod.POST,"/books/{bookId}/borrow").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.PUT,"/books/{bookId}/return").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.GET,"/books/{bookId}/reviews").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.POST,"/books/{bookId}/reserve").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.DELETE,"/books/{bookId}/cancel-reservation").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.POST,"/books/{bookId}/reviews/create").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.PUT,"/books/{bookId}/reviews/{reviewsId}/update").hasRole("CUSTOMER")
                            .requestMatchers(HttpMethod.DELETE,"/books/{bookId}/reviews/{reviewId}/delete").hasRole("CUSTOMER")
                            .anyRequest().authenticated();
                })
                .addFilter(new CustomAuthenticationFilter(authenticationManager))
                .addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
        ;
        return http.build();
    }
}
