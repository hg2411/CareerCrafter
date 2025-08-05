import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";

// Optional: Uncomment and use if you want salary filtering to work
// const checkSalaryRange = (salaryStr, rangeLabel) => {
//   const salary = parseInt(String(salaryStr).replace(/[^0-9]/g, ""));
//   if (isNaN(salary)) return false;

//   switch (rangeLabel) {
//     case "0-40k":
//       return salary <= 40000;
//     case "42-1lakh":
//       return salary >= 42000 && salary <= 100000;
//     case "1lakh to 5lakh":
//       return salary >= 100000 && salary <= 500000;
//     default:
//       return true;
//   }
// };

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJob] = useState(allJobs || []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to start of today to avoid time mismatches

    // Filter out expired jobs
    const nonExpiredJobs = allJobs.filter((job) => {
      if (!job.lastDate) return true; // Keep jobs without lastDate
      const jobLastDate = new Date(job.lastDate);
      jobLastDate.setHours(0, 0, 0, 0);
      return jobLastDate >= today;
    });

    // Then apply user filters
    if (
      searchedQuery &&
      typeof searchedQuery === "object" &&
      Object.keys(searchedQuery).length > 0
    ) {
      const filtered = nonExpiredJobs.filter((job) => {
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
      setFilterJob(nonExpiredJobs);
    }
  }, [searchedQuery, allJobs]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filterJobs.length === 0 ? (
          <span>Job not found</span>
        ) : (
          <div className="h-[88vh] overflow-y-auto pb-5">
           <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white text-sm font-medium rounded-full shadow-sm">
  <span className="bg-white text-[#6A38C2] font-semibold px-2 py-0.5 rounded-full text-xs">
    {filterJobs.length}
  </span>
  Active Job{filterJobs.length !== 1 && "s"} 
</div>

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
  );
};

export default Jobs;
