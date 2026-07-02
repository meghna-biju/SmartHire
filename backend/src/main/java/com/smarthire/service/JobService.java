package com.smarthire.service;
import com.smarthire.entity.JobApplication;
import com.smarthire.repository.JobRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<JobApplication> getApplications() {
        return jobRepository.findAll();
    }
    @SuppressWarnings("null")
    public JobApplication createApplication(JobApplication application) {
        return jobRepository.save(application);
    }
    public JobApplication updateStatus(Long id, String status) {
        JobApplication job =
                jobRepository.findById(id)
                .orElseThrow();

        job.setStatus(status);

        return jobRepository.save(job);
    }
}
