package com.hoang.textRecognize.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestResponseDto<T> {
    private static final String SUCCESS = "success";
    private static final String NOT_FOUND = "not_found";
    private static final String BAD_REQUEST = "bad_request";

    private T data;
    private int status;

    private String message;

    public RestResponseDto<T> success(T data) {
        this.data = data;
        this.status = 200;
        this.message = SUCCESS;
        return this;
    }

    public RestResponseDto<T> notFound() {
        this.status = 404;
        this.message = NOT_FOUND;
        return this;
    }

    public RestResponseDto<T> badRequest() {
        this.status = 400;
        this.message = BAD_REQUEST;
        return this;
    }
}
