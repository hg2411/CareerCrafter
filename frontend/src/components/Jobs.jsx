import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

// Helper to check salary range
const checkSalaryRange = (salaryStr, rangeLabel) => {
  const salary = parseInt(String(salaryStr).replace(/[^0-9]/g, ""));
  if (isNaN(salary)) return false;

  switch (rangeLabel) {
    case "0-40k":
      return salary <= 40000;
    case "42-1lakh":
      return salary >= 42000 && salary <= 100000;
    case "1lakh to 5lakh":
      return salary >= 100000 && salary <= 500000;
    default:
      return true;
  }
};

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJob] = useState(allJobs || []);

  useEffect(() => {
    if (
      searchedQuery &&
      typeof searchedQuery === "object" &&
      Object.keys(searchedQuery).length > 0
    ) {
      const filtered = allJobs.filter((job) => {
        const matchesLocation = searchedQuery.Location
          ? job.location?.toLowerCase() === searchedQuery.Location.toLowerCase()
          : true;

        const matchesIndustry = searchedQuery.Industry
          ? job.title?.toLowerCase().includes(searchedQuery.Industry.toLowerCase())
          : true;

        const matchesSalary = searchedQuery.Salary
          ? checkSalaryRange(job.salary, searchedQuery.Salary)
          : true;

        return matchesLocation && matchesIndustry && matchesSalary;
      });

      setFilterJob(filtered);
    } else {
      setFilterJob(allJobs);
    }
  }, [searchedQuery, allJobs]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>

          {filterJobs.length === 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
