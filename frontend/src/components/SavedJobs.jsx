import React, { useEffect, useState } from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  const handleRemove = (id) => {
    const updatedJobs = savedJobs.filter((job) => job._id !== id);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
    setSavedJobs(updatedJobs);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Content with padding to avoid overlap */}
      <div className="pt-24 px-4 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Saved Jobs</h1>

        {savedJobs.length === 0 ? (
          <p className="text-gray-500 text-center">You haven't saved any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <Job
                key={job._id}
                job={job}
                onRemove={() => handleRemove(job._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
