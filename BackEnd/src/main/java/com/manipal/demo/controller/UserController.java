package com.manipal.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.query.NativeQuery.ReturnableResultNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.system.ApplicationPid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.NotAcceptableStatusException;

import com.manipal.demo.dto.AptDto;
import com.manipal.demo.dto.ReportDto;
import com.manipal.demo.dto.Request;
import com.manipal.demo.entity.Appointment;
import com.manipal.demo.entity.Patient;
import com.manipal.demo.entity.Report;
import com.manipal.demo.entity.User;
import com.manipal.demo.exceptions.NotFound;
import com.manipal.demo.repository.AppointmentRepo;
import com.manipal.demo.service.UserService;


@RestController
@RequestMapping("/User")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	
	@Autowired
	private UserService userService;
	
	
	private List<Request> res=new ArrayList<>();
	
	@PostMapping("/request")
	public String adminRequest(@RequestBody Request request) {
		res.add(request);
		return "added";
	}
	
	@GetMapping("/getMyRequests/{pid}")
	public List<Request> getMyRequests(@PathVariable Long pid){
		List<Request> acptRes=res.stream().filter(a->a.getPid()==pid).collect(Collectors.toList());
		return acptRes;
	}
	
	@GetMapping("/acceptRequest/{pid}")
	public String acceptRequest(@PathVariable Long pid) {
		Optional<Request> apt=res.stream().filter(r->r.getPid()==pid).findFirst();
		
		if(Objects.isNull(apt)) {
			throw new NotFound();
		}else {
			res.remove(apt.get());
			Request req=apt.get();
		 return userService.acceptRequest(req);
		}
	}
	
	
	@PostMapping("/login/{email}/{password}")
	public User userLogin(@PathVariable String email, @PathVariable String password) {
		return userService.userLogin(email, password);
	}	
	
	@GetMapping("/logout/{id}")
	public String adminLogout(@PathVariable("id") Long id) {
		return userService.userLogout(id);
	}

	@PostMapping("/register")
	public User userRegister(@RequestBody User user) {
		return userService.userRegister(user);
	}
	
	@GetMapping("/Patient/get/{id}")
	public Optional<Patient> getPatientById(@PathVariable("id") long id) {
		Optional<Patient> patient=userService.findPatientById(id);
		return patient;
	}
	
	//@GetMapping("/Patient/{name}")
	//public Optional<Patient> findPatientByName(@PathVariable("name") String name){
		//Optional<Patient> patient=userService.findPatientByName(name);
		//return patient;
	//}
	@GetMapping("/getAllPatients")
	public List<Patient> getallPatients(){
		List<Patient> list=userService.getAllPatients();
		return list;
	}
	@GetMapping("/getAllUsers")
	public List<User> getallUsers(){
		List<User> list=userService.getAllUsers();
		return list;
	}
	@PostMapping("/addPatient")
	 public String addEmployee(@RequestBody Patient pat) {
		userService.addPatient(pat);
		return "data added";
	}
	@DeleteMapping("/Patient/delete/{id}")
	public String deletePatient(@PathVariable("id") long id) {
		userService.deletePatientById(id);
		return "Data deleted";
	}
	@PutMapping("/Patient/update/{id}")
	public String updateString(@PathVariable("id") long id,@RequestBody Patient patient) {
		userService.updatePatient(id,patient);
		return "data updated";
	}
	@GetMapping("/getAllReports")
	public List<Report> getallreports(){
		List<Report> list=userService.getAllReports();
		return list;
	}
	@PostMapping("/addReport")
	public String addNewReport(@RequestBody ReportDto reportDto) {
		userService.addReport(reportDto);
		return "report added";
	}
	@GetMapping("/Report/get/{name}")
	public List<Report> findReportByUserName(@PathVariable("name") String name){
		List<Report> report=userService.findReportByUserName(name);
		return report;
	}
	@GetMapping("/Report/getbyId/{id}")
	public Optional<Report> findReportByPatientId(@PathVariable("id") long id){
		Optional<Report> report=userService.findByPatientId(id);
		return report;
	}
	@PutMapping("/Report/update/{id}")
	public String updateReport(@PathVariable("id") long id,@RequestBody ReportDto reportDto) {
		userService.updateReport(id,reportDto);
		return "data updated";
	}
	@DeleteMapping("/Report/delete/{id}")
	public String deleteReportById(@PathVariable("id") long id) {
		userService.deleteReportById(id);
		return "Data deleted";
	}
	
	@PostMapping("/addAppointment")
	public String addNewAppointment(@RequestBody AptDto aptdto) {
		userService.addAppointment(aptdto);
		return "Appointment added";
	}
	
	@PutMapping("/Appointment/update/{id}")
	public String updateAppointment(@PathVariable("id") long id,@RequestBody AptDto aptdto) {
		userService.updateAppointment(id,aptdto);
		return "Appointment updated";
	}
	
	@GetMapping("/getAllAppointments")
	public List<Appointment> getallAppointmentsList(){
		List<Appointment> list=userService.getAllAppointments();
		return list;
	}
	
	@GetMapping("/Appointment/getbyId/{id}")
	public List<Appointment> findAppointmentById(@PathVariable("id") long id){
		List<Appointment> apt=userService.findAppointmentById(id);
		return apt;
	}
	
}
