package com.smarthire.service;

import com.smarthire.entity.User;
import com.smarthire.repository.UserRepository;
import com.smarthire.security.JwtUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> jwtUtil.generateToken(user.getEmail()))
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
    }

    public void register(String email, String password) {

    User user = new User();

    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(password));
    user.setRole("USER");

    userRepository.save(user);
}
}
