package reza.userservice.responses.user_register;

import lombok.Data;
import lombok.EqualsAndHashCode;
import reza.userservice.responses.BaseResponse;

import java.util.List;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserRegistrationErrorResponse extends BaseResponse<Void> {

    private Map<String, String> fieldErrors;
    private List<String> validationErrors;
    private String errorCode;

    public UserRegistrationErrorResponse() {
        super(false, "User registration failed");
    }

    public UserRegistrationErrorResponse(String message, String errorCode) {
        super(false, message);
        this.errorCode = errorCode;
    }


    public UserRegistrationErrorResponse(String message, String errorCode,
                                         Map<String, String> fieldErrors) {
        this(message, errorCode);
        this.fieldErrors = fieldErrors;
    }

//    // Static factory methods for common registration errors
//    public static UserRegistrationErrorResponse emailExists() {
//        return new UserRegistrationErrorResponse("Email already exists", "EMAIL_EXISTS");
//    }
//
//    public static UserRegistrationErrorResponse usernameExists() {
//        return new UserRegistrationErrorResponse("Username already exists", "USERNAME_EXISTS");
//    }
//
//    public static UserRegistrationErrorResponse invalidPassword() {
//        return new UserRegistrationErrorResponse("Password does not meet requirements", "INVALID_PASSWORD");
//    }
//
//    public static UserRegistrationErrorResponse validationFailed(Map<String, String> fieldErrors) {
//        return new UserRegistrationErrorResponse("Validation failed", "VALIDATION_ERROR", fieldErrors);
//    }
//
//    public static UserRegistrationErrorResponse invalidEmail() {
//        return new UserRegistrationErrorResponse("Invalid email format", "INVALID_EMAIL");
//    }
//
//    public static UserRegistrationErrorResponse weakPassword() {
//        return new UserRegistrationErrorResponse("Password is too weak", "WEAK_PASSWORD");
//    }
//
//    public static UserRegistrationErrorResponse serverError() {
//        return new UserRegistrationErrorResponse("Internal server error during registration", "SERVER_ERROR");
//    }
}