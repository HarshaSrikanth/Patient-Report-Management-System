package com.manipal.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.manipal.demo.entity.Admin;
import com.manipal.demo.entity.Patient;
import com.manipal.demo.entity.User;
@Repository
public interface AdminRepo extends JpaRepository<Admin,Long>{
		
	@Query("from Admin where email =?1")
    public Admin findByEmail(String Email);
		
	}

