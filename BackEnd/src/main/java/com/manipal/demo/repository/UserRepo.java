package com.manipal.demo.repository;

import org.springframework.data.domain.AfterDomainEventPublication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.manipal.demo.entity.Patient;
import com.manipal.demo.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
	@Query("from User where email =?1")
    public User findByEmail(String Email);
	
	
}
