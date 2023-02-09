package com.example.demo.student;

import com.example.demo.dto.ErrorDto;
import com.example.demo.student.exception.BabRequestException;
import com.example.demo.student.exception.StudentNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ControllerAdvice {


    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ErrorDto> runtimeExceptionHandler(RuntimeException re){
        ErrorDto error= ErrorDto
                .builder()
                .code("p-500")
                .mensage(re.getMessage())
                .build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = BabRequestException.class)
    public ResponseEntity<ErrorDto> babRequestExceptionHandler(BabRequestException bre){
        ErrorDto error= ErrorDto
                .builder()
                .code(bre.getCode())
                .mensage(bre.getMessage())
                .build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public Map<String, String> studentValidateExceptionHandler(MethodArgumentNotValidException ex){
        Map<String,String> errorMap= new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(err-> {
            String fielName=((FieldError)err).getField();
            String message=(err.getDefaultMessage());

            errorMap.put(fielName,message);
        });
        return errorMap;
    }
}
