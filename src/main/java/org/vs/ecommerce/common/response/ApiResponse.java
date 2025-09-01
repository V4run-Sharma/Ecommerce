package org.vs.ecommerce.common.response;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class ApiResponse<T> {
    private UUID requestId;
    private Instant timestamp = Instant.now();
    private boolean success;
    private String errorCode;
    private String errorMessage;
    private T data;

    public static <T> ApiResponse<T> success(UUID requestId, T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setRequestId(requestId);
        response.setSuccess(true);
        response.setData(data);
        return response;
    }

    public static <T> ApiResponse<T> failure(UUID requestId, String errorCode, String errorMessage) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setRequestId(requestId);
        response.setSuccess(false);
        response.setErrorCode(errorCode);
        response.setErrorMessage(errorMessage);
        return response;
    }
}