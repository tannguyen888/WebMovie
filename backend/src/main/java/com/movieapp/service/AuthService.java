package com.movieapp.service;

import com.movieapp.dto.request.AuthRequest;
import com.movieapp.dto.response.AuthResponse;
import com.movieapp.exception.DuplicateUserException;
import com.movieapp.exception.InvalidCredentialsException;
import com.movieapp.model.User;
import com.movieapp.repository.UserRepository;
import com.movieapp.security.JwtService;
import com.movieapp.util.Constants;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateUserException(Constants.USER_ALREADY_EXISTS);
        }

        if (request.getEmail() != null && userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateUserException(Constants.EMAIL_ALREADY_EXISTS);
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(Constants.ROLE_USER);
        user.setStatus(Constants.STATUS_ACTIVE);

        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser.getUsername());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setMessage(Constants.REGISTRATION_SUCCESSFUL);
        response.setUsername(savedUser.getUsername());
        response.setUserId(savedUser.getId());
        return response;
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new InvalidCredentialsException(Constants.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException(Constants.INVALID_CREDENTIALS);
        }

        String token = jwtService.generateToken(user.getUsername());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setMessage(Constants.LOGIN_SUCCESSFUL);
        response.setUsername(user.getUsername());
        response.setUserId(user.getId());
        return response;
    }

    public String getUsernameFromToken(String token) {
        return jwtService.extractUsername(token);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidCredentialsException(Constants.USER_NOT_FOUND));
    }

    public AuthResponse registerWithGoogle(String token) {
        return userRepository.findByGoogleToken(token)
                .map(user -> {
                    String jwtToken = jwtService.generateToken(user.getUsername());
                    AuthResponse response = new AuthResponse();
                    response.setToken(jwtToken);
                    response.setMessage(Constants.LOGIN_SUCCESSFUL);
                    response.setUsername(user.getUsername());
                    response.setUserId(user.getId());
                    return response;
                })

                .orElseThrow(() -> new InvalidCredentialsException(Constants.INVALID_TOKEN));

    }

    public AuthResponse loginWithGoogle(String token) {
        return userRepository.findByGoogleToken(token)
                .map(user -> {
                    String jwtToken = jwtService.generateToken(user.getUsername());
                    AuthResponse response = new AuthResponse();
                    response.setToken(jwtToken);
                    response.setMessage(Constants.LOGIN_SUCCESSFUL);
                    response.setUsername(user.getUsername());
                    response.setUserId(user.getId());
                    return response;
                })
                .orElseThrow(() -> new InvalidCredentialsException(Constants.INVALID_TOKEN));
    }
}
