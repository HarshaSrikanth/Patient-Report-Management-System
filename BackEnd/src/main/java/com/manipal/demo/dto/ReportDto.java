package com.manipal.demo.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportDto {
		
		private Long userId;    
		private Long patientId;
		private String testResults;
		private String diagnosisInfo;
		private LocalDate date;

}

