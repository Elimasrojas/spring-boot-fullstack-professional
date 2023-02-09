package com.example.demo.student.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@Getter
@ResponseStatus(HttpStatus.NOT_FOUND)
public class StudentNotFoundException extends RuntimeException {
    private String code;
    //private HttpStatus httpStatus;
    public StudentNotFoundException(String code,String msg) {
        super(msg);
        this.code=code;
        //this.httpStatus=httpStatus;
    }
}
