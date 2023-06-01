package com.manipal.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.manipal.demo.entity.Appointment;
import com.manipal.demo.entity.Report;
@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Long>{
	@Query("from Appointment where patient.id=?1")
	 public List<Appointment> findByPatientId(long id);
}
