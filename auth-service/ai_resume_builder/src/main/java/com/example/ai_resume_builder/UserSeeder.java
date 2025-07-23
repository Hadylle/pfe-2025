package com.example.ai_resume_builder;

import com.example.ai_resume_builder.model.User;
import com.example.ai_resume_builder.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUser("john@example.com", "password123", User.Role.USER, "John", "Doe");
        seedUser("jane@example.com", "password123", User.Role.ADMIN, "Jane", "Smith");
        seedUser("alice@example.com", "password123", User.Role.USER, "Alice", "Johnson");
        seedUser("bob@example.com", "password123", User.Role.USER, "Bob", "Brown");
        seedUser("emma@example.com", "password123", User.Role.USER, "Emma", "Davis");
    }

    private void seedUser(String email, String rawPassword, User.Role role, String firstName, String lastName) {
        if (!userRepository.existsByEmail(email)) {
            User user = new User(email, passwordEncoder.encode(rawPassword), role, firstName, lastName);
            userRepository.save(user);
            System.out.println("User " + email + " inserted.");
        } else {
            System.out.println("User " + email + " already exists.");
        }
    }
}
