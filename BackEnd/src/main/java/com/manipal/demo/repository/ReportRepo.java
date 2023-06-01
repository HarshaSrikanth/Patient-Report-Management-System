package com.manipal.demo.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.manipal.demo.entity.Report;

@Repository
public interface ReportRepo extends JpaRepository<Report, Long>{
  @Query("from Report where u_name_addedBy=?1")
  public List<Report> findByUserName(String name);
	 
	   
}