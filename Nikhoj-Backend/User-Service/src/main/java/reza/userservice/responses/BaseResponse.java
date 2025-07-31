package reza.userservice.responses;



import lombok.Data;

import java.time.LocalDateTime;
@Data
public class BaseResponse<T> {

    private boolean success;
    private String message;
    private T data;
    private String error;
    private LocalDateTime timestamp;

    public BaseResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public BaseResponse(boolean success, String message, T data) {
        this();
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public BaseResponse(boolean success, String message) {
        this(success, message, null);
    }

    // Static factory methods for success responses
    public static <T> BaseResponse<T> success(T data) {
        return new BaseResponse<>(true, "Success", data);
    }

    public static <T> BaseResponse<T> success(String message, T data) {
        return new BaseResponse<>(true, message, data);
    }

    public static <T> BaseResponse<T> success(String message) {
        return new BaseResponse<>(true, message, null);
    }

    // Static factory methods for error responses
    public static <T> BaseResponse<T> error(String error) {
        BaseResponse<T> response = new BaseResponse<>(false, null, null);
        response.setError(error);
        return response;
    }

    public static <T> BaseResponse<T> error(String message, String error) {
        BaseResponse<T> response = new BaseResponse<>(false, message, null);
        response.setError(error);
        return response;
    }


}