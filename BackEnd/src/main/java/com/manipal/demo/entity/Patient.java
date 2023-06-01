package com.manipal.demo.entity;


import java.util.List;

import org.hibernate.engine.internal.Cascade;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Patient")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
	@Id
	@SequenceGenerator(initialValue = 1,name = "patient_seq",sequenceName = "patient_sequence",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "patient_seq")
	@Column(name = "p_id")
	private long id;
	@Column(name = "p_name")
    private String name;
    private int age;
    private String gender;
    private String contact;
    private String medicalhistory;
}
