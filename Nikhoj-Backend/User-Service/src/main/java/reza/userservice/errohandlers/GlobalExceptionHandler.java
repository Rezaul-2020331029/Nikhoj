package reza.userservice.errohandlers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reza.userservice.errohandlers.errors.user_register.UserRegistrationException;
import reza.userservice.responses.user_register.UserRegistrationErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {



    @ExceptionHandler(UserRegistrationException.class)
    public ResponseEntity<UserRegistrationErrorResponse> handleUserRegistrationException(
            UserRegistrationException ex) {

        UserRegistrationErrorResponse response = new UserRegistrationErrorResponse(
                ex.getMessage(),
                ex.getErrorCode(),
                ex.getFieldErrors()
        );

        return ResponseEntity.badRequest().body(response);
    }


}
