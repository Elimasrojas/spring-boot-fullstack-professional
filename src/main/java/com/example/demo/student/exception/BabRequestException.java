package com.example.demo.student.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Data
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BabRequestException extends RuntimeException {

    private String code;
    public BabRequestException(String code,String msg) {
        super(msg);
        this.code=code;
    }
}
