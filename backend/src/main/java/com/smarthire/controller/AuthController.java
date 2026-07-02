package com.smarthire.controller;

import com.smarthire.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController 
{

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {

        System.out.println("LOGIN HIT");

        return ResponseEntity.ok(
                authService.login(
                        request.email(),
                        request.password()
                )
        );
    }

    public record LoginRequest(String email, String password) {
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(
                request.email(),
                request.password()
        );
        return ResponseEntity.ok("User registered");
    }

    public record RegisterRequest(
            String email,
            String password
    ) {}

}
