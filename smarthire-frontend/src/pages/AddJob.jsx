import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AddJob.css";

export default function AddJob() {

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    jobTitle: "",
    resumeUrl: "",
    status: "APPLIED",
    notes: ""
  });

  const saveJob = async () => {

    await api.post(
      "/api/jobs",
      formData
    );

    alert("Job added successfully");

    navigate("/dashboard");
  };

  return (
    <div className="add-job-container">
      <div className="job-card">
        <h1>Add Job Application</h1>

        <input
          name="applicantName"
          placeholder="Applicant Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="jobTitle"
          placeholder="Job Title"
          onChange={handleChange}
        />

        <input
          name="resumeUrl"
          placeholder="Resume URL"
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <textarea
          name="notes"
          placeholder="Interview notes, recruiter details, reminders..."
          rows="4"
          onChange={handleChange}
        />

        <button onClick={saveJob}>
          Save Job
        </button>
      </div>
    </div>
  );
}