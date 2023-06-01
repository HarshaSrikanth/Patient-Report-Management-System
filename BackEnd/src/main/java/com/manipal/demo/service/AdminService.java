package com.manipal.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.manipal.demo.dto.AptDto;
import com.manipal.demo.dto.ReportDto;
import com.manipal.demo.entity.Admin;
import com.manipal.demo.entity.Appointment;
import com.manipal.demo.entity.Patient;
import com.manipal.demo.entity.Report;
import com.manipal.demo.entity.User;

@Service
public interface AdminService {
	public Admin adminLogin(String email, String password);
	   public String adminLogout(Long id);
	
	   public User userRegister(User user);
	   public Optional<Patient> findPatientById(long id);
	  // public Optional<Patient> findPatientByName(String name);
	   public List<Patient> getAllPatients();
	   public List<User> getAllUsers();
	   public void deleteUserById(long id);
	   public void updateUserById(long id,User user);
	 
	   public void addPatient(Patient patient);
	   public void deletePatientById(long id);
	   public void updatePatient(Long id,Patient patient);
	   
	   public List<Report> getAllReports();
	   public String addReport(ReportDto reportDto);
	   public List<Report> findReportByUserName(String name);
	   public void deleteReportById(long id);
	   public void updateReport(Long r_id,ReportDto reportDto);
	   
	   public String addAppointment(AptDto aptdto);
	   public void updateAppointment(Long apt_id,AptDto aptdto);
	   public List<Appointment> getAllAppointments();
}
