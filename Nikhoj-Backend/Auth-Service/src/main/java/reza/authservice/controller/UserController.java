package reza.authservice.controller;


import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reza.authservice.dto.LoginRequest;
import reza.authservice.dto.SignupRequest;
import reza.authservice.exception.user.UserNotFoundException;
import reza.authservice.service.UserService;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        return userService.authenticate(loginRequest);
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> login(@Valid @RequestBody SignupRequest signupRequest){
        return userService.register(signupRequest);
    }


    @GetMapping("/user/exception")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> testUserException() {
        throw new UserNotFoundException("User");
    }

}
