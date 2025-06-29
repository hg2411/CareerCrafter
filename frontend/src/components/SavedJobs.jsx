import React, { useEffect, useState } from "react";
import Job from "./Job";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

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
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p className="text-gray-600">No jobs saved yet.</p>
      ) : (
        savedJobs.map((job) => (
          <div key={job._id} className="relative">
            <Job job={job} />
            <div className="absolute top-4 right-4">
              <Button
                onClick={() => handleRemove(job._id)}
                variant="ghost"
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Trash2 size={16} />
                Remove
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedJobs;
