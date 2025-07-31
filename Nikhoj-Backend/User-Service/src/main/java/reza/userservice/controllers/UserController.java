package reza.userservice.controllers;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reza.userservice.domain.entities.User;
import reza.userservice.responses.user_register.UserRegistrationErrorResponse;
import reza.userservice.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }



    @PostMapping("/register")
    public ResponseEntity<UserRegistrationErrorResponse> registerUser(
            @RequestBody User user
            )
    {

        User newUser = userService.createUser(user);
        return ResponseEntity.ok(
                new UserRegistrationErrorResponse("User Created Successfully","SUCCESS")
        );


    }

}
