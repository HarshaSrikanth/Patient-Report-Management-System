package com.manipal.demo.entity;

import java.util.List;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "User")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
   @Id
   @SequenceGenerator(initialValue = 1,name = "user_seq",sequenceName = "user_sequence",allocationSize = 1)
   @GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "user_seq")
   @Column(name="u_id")
   private long id;
   @Column(name="u_name")
   private String name;
   @Email
   private String email;
   @NotBlank(message = "password the mandatory")
   @Size(min = 8, message = "length should be 8")
   private String password;
   private String role;
   private Boolean isActive=true;

}
