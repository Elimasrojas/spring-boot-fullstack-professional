package com.example.demo.student;

import com.example.demo.student.exception.BabRequestException;
import com.example.demo.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudent(){
        return  studentRepository.findAll();
    }

    public void addStudent(Student student) {
        /*Optional<Student> op=studentRepository.findByEmail(student.getEmail());
        if (op.isPresent()){
            System.out.println("ya existe");
        }
        System.err.println("no existe");
        */
        Boolean existsEmail=studentRepository.selectExistsEmail(student.getEmail());
        if(existsEmail){
            //throw new IllegalStateException("Opps que embarrada");
            throw new BabRequestException("p-400","Email "+student.getEmail()+ " taken" );
        }
        studentRepository.save(student);
    }


    public void deleteStudent(Long studentId) {
        //cheque si existe promero
        if(!studentRepository.existsById(studentId)){
            throw new StudentNotFoundException("p-502","Student With id:"+ studentId+ " does no exist");
        }
        studentRepository.deleteById(studentId);
    }
}
