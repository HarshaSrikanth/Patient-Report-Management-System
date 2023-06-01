package com.manipal.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manipal.demo.dto.AptDto;
import com.manipal.demo.dto.ReportDto;
import com.manipal.demo.dto.Request;
import com.manipal.demo.entity.Admin;
import com.manipal.demo.entity.Appointment;
import com.manipal.demo.entity.Patient;
import com.manipal.demo.entity.Report;
import com.manipal.demo.entity.User;
import com.manipal.demo.service.AdminService;
import com.manipal.demo.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	
	@PostMapping("/login/{email}/{password}")
	public Admin userLogin(@PathVariable String email, @PathVariable String password) {
		return adminService.adminLogin(email, password);
	}	
	
	@GetMapping("/logout/{id}")
	public String adminLogout(@PathVariable("id") Long id) {
		return adminService.adminLogout(id);
	}
	
	@GetMapping("/Patient/get/{id}")
	public Optional<Patient> getPatientById(@PathVariable("id") long id) {
		Optional<Patient> patient=adminService.findPatientById(id);
		return patient;
	}
	
	@PostMapping("/user/register")
	public User userRegister(@RequestBody User user) {
		return adminService.userRegister(user);
	}
	
	//@GetMapping("/Patient/{name}")
	//public Optional<Patient> findPatientByName(@PathVariable("name") String name){
    //		Optional<Patient> patient=adminService.findPatientByName(name);
    //		return patient;
   //	}
	@GetMapping("/getAllPatients")
	public List<Patient> getallPatients(){
		List<Patient> list=adminService.getAllPatients();
		return list;
	}
	@GetMapping("/getAllUsers")
	public List<User> getallUsers(){
		List<User> list=adminService.getAllUsers();
		return list;
	}
	@DeleteMapping("/user/delete/{id}")
	public String deleteUser(@PathVariable("id") long id) {
		adminService.deleteUserById(id);
		return "Data deleted";
	}
	@PutMapping("/user/update/{id}")
	public String updateUserById(@PathVariable("id") long id,@RequestBody User user) {
		adminService.updateUserById(id, user);
		return "User Data Updated";
	}
	@PostMapping("/addPatient")
	 public String addEmployee(@RequestBody Patient pat) {
		adminService.addPatient(pat);
		return "data added";
	}
	@DeleteMapping("/Patient/delete/{id}")
	public String deletePatient(@PathVariable("id") long id) {
		adminService.deletePatientById(id);
		return "Data deleted";
	}
	@PutMapping("/Patient/update/{id}")
	public String updateString(@PathVariable("id") long id,@RequestBody Patient patient) {
		adminService.updatePatient(id,patient);
		return "data updated";
	}
	@GetMapping("/getAllReports")
	public List<Report> getallreports(){
		List<Report> list=adminService.getAllReports();
		return list;
	}
	@PostMapping("/addReport")
	public String addNewReport(@RequestBody ReportDto reportDto) {
		adminService.addReport(reportDto);
		return "report added";
	}
	@GetMapping("/Report/get/{name}")
	public List<Report> findReportByUserName(@PathVariable("name") String name){
		List<Report> report=adminService.findReportByUserName(name);
		return report;
	}
	@PutMapping("/Report/update/{id}")
	public String updateReport(@PathVariable("id") long id,@RequestBody ReportDto reportDto) {
		adminService.updateReport(id,reportDto);
		return "data updated";
	}
	@DeleteMapping("/Report/delete/{id}")
	public String deleteReportById(@PathVariable("id") long id) {
		adminService.deleteReportById(id);
		return "Data deleted";
	}
	
	@PostMapping("/addAppointment")
	public String addNewAppointment(@RequestBody AptDto aptdto) {
		adminService.addAppointment(aptdto);
		return "Appointment added";
	}
	
	@PutMapping("/Appointment/update/{id}")
	public String updateAppointment(@PathVariable("id") long id,@RequestBody AptDto aptdto) {
		adminService.updateAppointment(id,aptdto);
		return "Appointment updated";
	}
	
	@GetMapping("/getAllAppointments")
	public List<Appointment> getallAppointmentsList(){
		List<Appointment> list=adminService.getAllAppointments();
		return list;
	}
}
