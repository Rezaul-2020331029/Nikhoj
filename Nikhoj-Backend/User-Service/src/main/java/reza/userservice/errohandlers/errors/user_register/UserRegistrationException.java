package reza.userservice.errohandlers.errors.user_register;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserRegistrationException extends RuntimeException {

    private final String errorCode;
    private final Map<String, String> fieldErrors;

    public UserRegistrationException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.fieldErrors = null;
    }

    public UserRegistrationException(String message, String errorCode, Map<String, String> fieldErrors) {
        super(message);
        this.errorCode = errorCode;
        this.fieldErrors = fieldErrors;
    }

    public UserRegistrationException(String message, String errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
        this.fieldErrors = null;
    }

//    // Static factory methods matching your response class
    public static UserRegistrationException emailExists() {
        return new UserRegistrationException("Email already exists", "EMAIL_EXISTS");
    }

    public static UserRegistrationException phoneExists() {
        return new UserRegistrationException("Phone Number already exists", "PHONE_EXISTS");
    }


//
//    public static UserRegistrationException usernameExists() {
//        return new UserRegistrationException("Username already exists", "USERNAME_EXISTS");
//    }
//
//    public static UserRegistrationException invalidPassword() {
//        return new UserRegistrationException("Password does not meet requirements", "INVALID_PASSWORD");
//    }
//
//    public static UserRegistrationException validationFailed(Map<String, String> fieldErrors) {
//        return new UserRegistrationException("Validation failed", "VALIDATION_ERROR", fieldErrors);
//    }
//
//    public static UserRegistrationException invalidEmail() {
//        return new UserRegistrationException("Invalid email format", "INVALID_EMAIL");
//    }
//
//    public static UserRegistrationException weakPassword() {
//        return new UserRegistrationException("Password is too weak", "WEAK_PASSWORD");
//    }
//
//    public static UserRegistrationException serverError() {
//        return new UserRegistrationException("Internal server error during registration", "SERVER_ERROR");
//    }
}
