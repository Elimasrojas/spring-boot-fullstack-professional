package com.example.demo.student;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "student")
public class Student {
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue (
            generator = "student_sequence",
            strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotBlank(message = "Carajo el nombre no puede estar vacio")
    @Column(nullable = false)
    private String name;
    @Email
    @Column(nullable = false,unique = true)
    private String email;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;


}
