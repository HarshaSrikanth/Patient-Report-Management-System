package com.manipal.demo.entity;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.relational.core.sql.TrueCondition;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Report")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Report{
	@Id
	@SequenceGenerator(initialValue = 1,name = "report_seq",sequenceName = "report_sequence",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "report_seq")
	@Column(name ="r_id")
	private long id;
	@OneToOne
	@JoinColumn(name="p_id",unique =true)
	private Patient patient;
	private String p_name;
	private String testResults;
	private String diagnosisInfo;
	@ManyToOne
	@JoinColumn(name="u_id_addedBy")
	private User addedBy;
	private String u_name_addedBy;
	private LocalDate date;
	
}
