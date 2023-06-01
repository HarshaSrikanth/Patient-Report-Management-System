package com.manipal.demo.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.manipal.demo.entity.Patient;
import com.manipal.demo.entity.Report;


@Repository
public interface PatientRepo extends JpaRepository<Patient,Long>{
	@Query("from Patient where contact=?1")
	public Patient findByContact(String contact);
	
	
}
