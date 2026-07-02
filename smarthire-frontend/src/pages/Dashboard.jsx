import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await api.get("/api/jobs");

      console.log("Response:", response);
      console.log("Jobs:", response.data);

      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
      job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      job.applicantName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "ALL" ||
      job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const appliedCount =
    jobs.filter(j => j.status === "APPLIED").length;

  const interviewCount =
    jobs.filter(j => j.status === "INTERVIEW").length;

  const offerCount =
    jobs.filter(j => j.status === "OFFER").length;

  const rejectedCount =
    jobs.filter(j => j.status === "REJECTED").length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-3 hover:bg-blue-700"
        onClick={() => navigate("/add-job")}
        >
        Add Job
        </button>

      {" "}

      <button
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
        }}
        >
        Logout
        </button>

      <h1 className="text-5xl font-bold text-center mb-6">SmartHire Dashboard</h1>

      <h3>Total Applications: {jobs.length}</h3>

      <div className="grid grid-cols-4 gap-4 my-8">

        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">Applied</h3>
            <p className="text-3xl">{appliedCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">Interview</h3>
            <p className="text-3xl">{interviewCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">Offer</h3>
            <p className="text-3xl">{offerCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">Rejected</h3>
            <p className="text-3xl">{rejectedCount}</p>
        </div>

        </div>

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="ALL">All</option>
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
      </select>

      <br />
      <br />

      {filteredJobs.map((job) => (
        <div key={job.id} className="bg-white rounded-xl shadow-md p-5 mb-4">

          <h2 className="text-2xl font-bold">{job.jobTitle}</h2>

          <p>
            <strong>Applicant:</strong> {job.applicantName}
          </p>

          <p>
            <strong>Email:</strong> {job.email}
          </p>

          <p>
            <strong>Status:</strong>
          </p>

          <select
            value={job.status}
            onChange={async (e) => {

              try {

                await api.put(
                  `/api/jobs/${job.id}/status?status=${e.target.value}`
                );

                loadJobs();

              } catch (error) {
                console.error(error);
              }
            }}
          >
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {job.notes && (
            <p>
              <strong>Notes:</strong> {job.notes}
            </p>
          )}

          <br />
          <hr />

        </div>
      ))}
    </div>
  );
}