package com.manipal.demo.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manipal.demo.dto.AptDto;
import com.manipal.demo.dto.ReportDto;
import com.manipal.demo.entity.Admin;
import com.manipal.demo.entity.Appointment;
import com.manipal.demo.entity.Patient;
import com.manipal.demo.entity.Report;
import com.manipal.demo.entity.User;
import com.manipal.demo.exceptions.AlreadyThere;
import com.manipal.demo.exceptions.NotFound;
import com.manipal.demo.repository.AdminRepo;
import com.manipal.demo.repository.AppointmentRepo;
import com.manipal.demo.repository.PatientRepo;
import com.manipal.demo.repository.ReportRepo;
import com.manipal.demo.repository.UserRepo;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminRepo adminRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private PatientRepo patientRepo;
	@Autowired
	private ReportRepo reportRepo;
	@Autowired
	private AppointmentRepo appointmentRepo;

	@Override
	public Admin adminLogin(String email, String password) {
		Admin admin = adminRepo.findByEmail(email);
		if (Objects.isNull(admin))
			throw new NotFound();

		if (admin.getPassword().equals(password)) {
			admin.setIsActive(true);
			adminRepo.save(admin);
		} else
			throw new NotFound();
		return admin;
	}

	@Override
	public String adminLogout(Long id) {
      Admin admin =adminRepo.findById(id).orElseThrow(() -> new NotFound("Admin not found"));
		
		admin.setIsActive(false);
		adminRepo.save(admin);
		
		return "Logged Out";
	}
	
	
	@Override
	public User userRegister(User user) {
		User user1= userRepo.findByEmail(user.getEmail());
		if(Objects.isNull(user1)) {
		  return userRepo.save(user);
		}
		throw new AlreadyThere();
	
	}
	
	@Override
	public Optional<Patient> findPatientById(long id){
		return patientRepo.findById(id);
			
	}

	//@Override
	//public Optional<Patient> findPatientByName(String name) {
		//return patientRepo.findByName(name);
	//}

	@Override
	public List<Patient> getAllPatients() {
		List<Patient> list=patientRepo.findAll();
		return list;
	}
	
	@Override
	public List<User> getAllUsers() {
		List<User> list=userRepo.findAll();
		return list;
	}
	
	@Override
	public void deleteUserById(long id) {
		userRepo.deleteById(id);
		
	}
	

	@Override
	public void addPatient(Patient patient) {
		patientRepo.save(patient);
		
	}

	@Override
	public void deletePatientById(long id) {
		patientRepo.deleteById(id);
		
	}

	@Override
	public void updatePatient(Long id,Patient patient) {
		Patient patient1=patientRepo.findById(id).get();
		patient1.setName(patient.getName());
		patient1.setGender(patient.getGender());
		patient1.setAge(patient.getAge());
		patient1.setContact(patient.getContact());
		patient1.setMedicalhistory(patient.getMedicalhistory());
		
		patientRepo.save(patient1);
		
		
	}

	@Override
	public String addReport(ReportDto reportDto) {
		Report report = new Report();
		User user = userRepo.findById(reportDto.getUserId()).orElseThrow(() -> new NotFound("User Not Found"));
		Patient patient=patientRepo.findById(reportDto.getPatientId()).orElseThrow(() -> new NotFound("Patient Not Found"));
		report.setPatient(patient);
		report.setP_name(patient.getName());
		report.setTestResults(reportDto.getTestResults());
		report.setDiagnosisInfo(reportDto.getDiagnosisInfo());
		report.setAddedBy(user);
		report.setU_name_addedBy(user.getName());
		report.setDate(reportDto.getDate());
		reportRepo.save(report);
		return "Report Added";
		
	}

	@Override
	public List<Report> getAllReports() {
		List<Report> list=reportRepo.findAll();
		return list;
	}
	@Override
	public List<Report> findReportByUserName(String name){
		return reportRepo.findByUserName(name);
	}

	@Override
	public void updateReport(Long r_id, ReportDto reportDto) {
		Report report2=reportRepo.findById(r_id).get();
		User user = userRepo.findById(reportDto.getUserId()).orElseThrow(() -> new NotFound("User Not Found"));
		Patient patient=patientRepo.findById(reportDto.getPatientId()).orElseThrow(() -> new NotFound("Patient Not Found"));
		report2.setPatient(patient);
		report2.setP_name(patient.getName());
		report2.setTestResults(reportDto.getTestResults());
		report2.setDiagnosisInfo(reportDto.getDiagnosisInfo());
		report2.setAddedBy(user);
		report2.setU_name_addedBy(user.getName());
		report2.setDate(reportDto.getDate());
		reportRepo.save(report2);
	}

	@Override
	public void deleteReportById(long id) {
		reportRepo.deleteById(id);
		
	}

	@Override
	public String addAppointment(AptDto aptdto) {
		Appointment apt = new Appointment();
		User user = userRepo.findById(aptdto.getUserId()).orElseThrow(() -> new NotFound("User Not Found"));
		Patient patient=patientRepo.findById(aptdto.getPatientId()).orElseThrow(() -> new NotFound("Patient Not Found"));
		apt.setPatient(patient);
		apt.setUser(user);
		apt.setDate(aptdto.getDate());
		appointmentRepo.save(apt);
		return "Appointment Added";
	}
	
	@Override
	public void updateAppointment(Long apt_id, AptDto aptdto) {
		Appointment appointment=appointmentRepo.findById(apt_id).get();
		User user = userRepo.findById(aptdto.getUserId()).orElseThrow(() -> new NotFound("User Not Found"));
		Patient patient=patientRepo.findById(aptdto.getPatientId()).orElseThrow(() -> new NotFound("Patient Not Found"));
		appointment.setPatient(patient);
	    appointment.setUser(user);
		appointment.setDate(aptdto.getDate());
		appointmentRepo.save(appointment);
	}

	@Override
	public List<Appointment> getAllAppointments() {
		List<Appointment> list=appointmentRepo.findAll();
		return list;
	}

	@Override
	public void updateUserById(long id,User user) {
		User user1=userRepo.findById(id).get();
		user1.setName(user.getName());
		user1.setEmail(user.getEmail());
		user1.setPassword(user.getPassword());
		user1.setRole(user.getRole());
		userRepo.save(user1);
	}



}
