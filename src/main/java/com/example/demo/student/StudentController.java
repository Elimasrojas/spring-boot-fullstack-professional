package com.example.demo.student;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    @GetMapping
    public List<Student> getAllStudent (){
        //throw new IllegalStateException("Opps que embarrada");
        return studentService.getAllStudent();
    }

    @PostMapping
    public void addStudent (@Valid @RequestBody Student student){
        studentService.addStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public void deleteStudent (@PathVariable("studentId") Long studentId)
    {
        studentService.deleteStudent(studentId);
    }



}
