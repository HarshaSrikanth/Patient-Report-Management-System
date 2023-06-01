package com.manipal.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="Appointment")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
	 @Id
	 @SequenceGenerator(initialValue = 1,name = "appointment_seq",sequenceName = "appointment_sequence",allocationSize = 1)
	 @GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "appointment_seq")
	 @Column(name = "apt_id")
	 private long id;
	 @ManyToOne
	 @JoinColumn(name="p_id")
	 private Patient patient;
	 @ManyToOne
	 @JoinColumn(name="u_id")
	 private User user;
	 private LocalDate date;

}
