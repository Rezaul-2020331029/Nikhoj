package reza.monolithicbackend.Auth.controller;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reza.monolithicbackend.Auth.dto.ChangePassReq;
import reza.monolithicbackend.Auth.dto.LoginRequest;
import reza.monolithicbackend.Auth.dto.SignupRequest;
import reza.monolithicbackend.Auth.exception.user.UserNotFoundException;
import reza.monolithicbackend.Auth.model.UserInfo;
import reza.monolithicbackend.Auth.service.AuthenticationService;
import reza.monolithicbackend.Auth.service.UserService;
import reza.monolithicbackend.POST.domains.dtos.response.BaseResponse;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserController {

    final UserService userService;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, AuthenticationService authenticationService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authenticationService = authenticationService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        return userService.authenticate(loginRequest);
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest){

        System.out.println(signupRequest);
        return userService.register(signupRequest);
    }

    @PostMapping("/auth/change-password")
    public ResponseEntity<BaseResponse<String, Object>> changePassword(@RequestBody ChangePassReq req) {
        try {
            UUID id = authenticationService.getCurrentUserId();
            UserInfo user = userService.getUserById(id);

            // Check if old password matches the stored password using matches()
            if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
                return BaseResponse.badRequest("Incorrect old password", null);
            }

            // Encode new password and update user
            String encryNewPass = passwordEncoder.encode(req.getNewPassword());
            user.setPassword(encryNewPass);

            // Save the updated user (you'll need to add this method to userService)
            userService.saveUser(user);

            return BaseResponse.success("Password changed successfully", "Password updated");

        } catch (Exception e) {
            return BaseResponse.error("Failed to change password: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }


    @GetMapping("/auth/exception")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> testUserException() {
        throw new UserNotFoundException("User");
    }

}
