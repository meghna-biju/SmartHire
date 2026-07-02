package com.smarthire.repository;

import com.smarthire.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<JobApplication, Long> {
}
