import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Eye } from "lucide-react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AdminJobTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  if (!filterJobs) {
    return (
      <div className="max-w-6xl mx-auto mt-10 text-center text-gray-500">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      <Table className="w-full">
        <TableCaption className="text-gray-500 mt-4 text-sm">
          A list of your recently posted jobs.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-6 py-4 text-gray-700 font-semibold text-sm uppercase">
              Role
            </TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-semibold text-sm uppercase">
              Date
            </TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-semibold text-sm uppercase text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                No jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <TableCell className="px-6 py-4 text-gray-600 font-medium">
                  {job?.title}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600">
                  {moment(job.createdAt).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <button
                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 text-sm shadow-sm font-medium transition cursor-pointer ml-auto"
                  >
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span>View Applicants</span>
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobTable;