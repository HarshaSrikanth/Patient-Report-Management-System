package com.manipal.demo.entity;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="Admin")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Admin {
   @Id
   @SequenceGenerator(initialValue = 1,name = "admin_seq",sequenceName = "admin_sequence",allocationSize = 1)
   @GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "admin_seq")
   @Column(name = "a_id")
   private long id;
   private String name;
   private String email;
   private String password;
   private Boolean isActive=true;
}
