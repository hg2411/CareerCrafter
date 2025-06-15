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
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AdminJobTable = () => {
//   const searchJobByText = useSelector((store) => store.job.searchJobByText);
// const allAdminJobs = useSelector((store) => store.job.allAdminJobs);
const {allAdminJobs,searchJobByText}=useSelector(store=>store.job);


  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
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
              Company Name
            </TableHead>
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
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <TableCell className="px-6 py-4 font-medium text-gray-800">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600">
                  {job?.title}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600">
                  {moment(job.createdAt).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-gray-700" />
                    </PopoverTrigger>
                    <PopoverContent className="w-28 p-1.5 shadow-xl rounded-md bg-white border border-gray-200">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition text-sm cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4 text-gray-700" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                        <Eye className='w-4'/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
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
