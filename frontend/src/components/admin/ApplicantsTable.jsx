import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MoreHorizontal, CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortlistingStatus = [
  {
    label: "Accepted",
    icon: (
      <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" title="Accepted" />
    ),
  },
  {
    label: "Rejected",
    icon: <XCircle className="w-4 h-4 text-red-600 mr-2" title="Rejected" />,
  },
];

const ApplicantsTable = ({ jobId }) => {
  const { applicants } = useSelector((store) => store.application);
  const [selectingId, setSelectingId] = useState(null);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSelectStudent = async (studentId, jobId) => {
    try {
      setSelectingId(studentId);
      const res = await axios.post(
        "http://localhost:8000/api/v1/job/select-student",
        { studentId, jobId },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Student selected & email sent!");
      } else {
        toast.error(res.data.message || "Failed to select student");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setSelectingId(null);
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-200 bg-white max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Applicants Overview
      </h2>

      <div className="overflow-x-auto">
        <Table className="rounded-2xl overflow-hidden text-sm">
          <TableCaption className="text-gray-500 text-xs pb-4">
            A list of your recently applied users
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.applications?.map((item) => {
              const isSelected = item?.status === "Selected";
              return (
                <TableRow
                  key={item._id}
                  className={`hover:bg-gray-50 ${
                    isSelected ? "bg-green-50" : ""
                  } transition-all duration-200`}
                >
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${item?.applicant?.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item?.applicant?.email}
                    </a>
                  </TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {item?.applicant?.profile?.resume ? (
                      <>
                        <a
                          href={item.applicant.profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {item.applicant.profile.resumeOriginalName}
                        </a>
                        <a
                          href={item.applicant.profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-sm text-gray-500 hover:underline"
                        >
                          Open
                        </a>
                      </>
                    ) : (
                      <span className="text-gray-400">NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(item?.createdAt).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : item.status === "Selected"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status || "Applied"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-gray-200 transition">
                          <MoreHorizontal className="w-5 h-5 text-gray-600" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-44 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                        {shortlistingStatus.map(({ label, icon }, index) => (
                          <div
                            key={index}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm text-gray-700 font-medium transition"
                            onClick={() => statusHandler(label, item?._id)}
                          >
                            {icon}
                            <span>{label}</span>
                          </div>
                        ))}
                        {isSelected ? (
                          <div className="flex items-center px-3 py-2 text-green-600 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Already Selected
                          </div>
                        ) : (
                          <div
                            className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm text-gray-700 font-medium transition"
                            onClick={() =>
                              handleSelectStudent(item?.applicant?._id, jobId)
                            }
                          >
                            {selectingId === item?.applicant?._id ? (
                              <svg
                                className="animate-spin h-4 w-4 mr-2 text-gray-600"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                ></path>
                              </svg>
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                            )}
                            <span>Select Student</span>
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
