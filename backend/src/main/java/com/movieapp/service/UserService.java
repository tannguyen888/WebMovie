package com.movieapp.service;

import com.movieapp.model.User;
import com.movieapp.repository.UserRepository;
import com.movieapp.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import com.movieapp.hash.hashTable;

import java.util.List;

@Service
public class UserService {
    private final hashTable hashTable = new hashTable();
    private final User user;
    private final UserRepository userRepository;
    private final hashTable passwordHasher; 

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordHasher = new hashTable(1000); // Size = 1000
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User createUser(User user) {
        // Hash the password before saving
        String hashedPassword = hashTable.hashItem(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    public User updateUser(Long id, User updatedUser) {
        User user = getUserById(id);
        if (updatedUser.getEmail() != null) {
            user.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getRole() != null) {
            user.setRole(updatedUser.getRole());
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
