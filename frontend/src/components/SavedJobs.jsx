import React, { useEffect, useState } from "react";
import Job from "./Job"; // Same Job component reused

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p>No jobs saved yet.</p>
      ) : (
        savedJobs.map((job) => <Job key={job._id} job={job} />)
      )}
    </div>
  );
};

export default SavedJobs;
