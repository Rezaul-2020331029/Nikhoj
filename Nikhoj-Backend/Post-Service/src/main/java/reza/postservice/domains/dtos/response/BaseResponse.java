package reza.postservice.domains.dtos.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
@Builder
@Data
@AllArgsConstructor
public class BaseResponse<T, V> {

    private String message;
    private String statusCode;
    private String status;
    private T payload;
    private List<V> errors;

    // Static helper methods to create ResponseEntity with BaseResponse
    public static <T, V> ResponseEntity<BaseResponse<T, V>> success(T payload) {
        BaseResponse<T, V> response = BaseResponse.<T, V>builder()
                .statusCode("200")
                .status("SUCCESS")
                .message("Operation completed successfully")
                .payload(payload)
                .build();
        return ResponseEntity.ok(response);
    }

    public static <T, V> ResponseEntity<BaseResponse<T, V>> success(String message, T payload) {
        BaseResponse<T, V> response = BaseResponse.<T, V>builder()
                .statusCode("200")
                .status("SUCCESS")
                .message(message)
                .payload(payload)
                .build();
        return ResponseEntity.ok(response);
    }

    public static <T, V> ResponseEntity<BaseResponse<T, V>> created(T payload) {
        BaseResponse<T, V> response = BaseResponse.<T, V>builder()
                .statusCode("201")
                .status("CREATED")
                .message("Resource created successfully")
                .payload(payload)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    public static <T, V> ResponseEntity<BaseResponse<T, V>> created(String message, T payload) {
        BaseResponse<T, V> response = BaseResponse.<T, V>builder()
                .statusCode("201")
                .status("CREATED")
                .message(message)
                .payload(payload)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    public static <T, V> ResponseEntity<BaseResponse<T, V>> error(String message, HttpStatus status, List<V> errors) {
        BaseResponse<T, V> response = BaseResponse.<T, V>builder()
                .statusCode(String.valueOf(status.value()))
                .status("ERROR")
                .message(message)
                .errors(errors)
                .build();
        return ResponseEntity.status(status).body(response);
    }

    public static <T, V> ResponseEntity<BaseResponse<T, V>> badRequest(String message, List<V> errors) {
        return error(message, HttpStatus.BAD_REQUEST, errors);
    }

    public static <T, V> ResponseEntity<BaseResponse<T, V>> unauthorized(String message) {
        return error(message, HttpStatus.UNAUTHORIZED, null);
    }
}
