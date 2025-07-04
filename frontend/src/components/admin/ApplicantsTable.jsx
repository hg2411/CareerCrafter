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
  { label: "Accepted", icon: <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" /> },
  { label: "Rejected", icon: <XCircle className="w-4 h-4 text-red-600 mr-2" /> },
];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [parsedData, setParsedData] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

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

  const fetchParsedResume = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/resume/parse/${studentId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setParsedData(res.data.data);
        setSelectedApplicant(studentId);
      }
    } catch (error) {
      const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch parsed resume";
      toast.error(message);
    console.error("Error fetching parsed resume:", error);
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-200 bg-white max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Applicants Overview
      </h2>

      <Table className="rounded-2xl overflow-hidden text-sm">
        <TableCaption className="text-gray-500 text-xs pb-4">
          A list of your recently applied users
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-gray-700">Full Name</TableHead>
            <TableHead className="text-gray-700">Email</TableHead>
            <TableHead className="text-gray-700">Contact</TableHead>
            <TableHead className="text-gray-700">Resume</TableHead>
            <TableHead className="text-gray-700">Date</TableHead>
            <TableHead className="text-gray-700">Parsed</TableHead>
            <TableHead className="text-right text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow
              key={item._id}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-400">NA</span>
                )}
              </TableCell>
              <TableCell>
                {item?.applicant?.createdAt?.split("T")[0] || "N/A"}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => fetchParsedResume(item?.applicant?._id)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Parsed
                </button>
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-200 transition">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
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
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {parsedData && selectedApplicant && (
        <div className="mt-8 p-4 border rounded bg-gray-50 max-w-4xl mx-auto">
          <h3 className="font-semibold mb-2 text-lg">Parsed Resume Info:</h3>
          <p><strong>Name:</strong> {parsedData.name}</p>
          <p><strong>Email:</strong> {parsedData.email}</p>
          <p><strong>Phone:</strong> {parsedData.phone}</p>
          <p><strong>LinkedIn:</strong> {parsedData.linkedin}</p>
          <p><strong>GitHub:</strong> {parsedData.github}</p>
          <p><strong>Skills:</strong> {parsedData.skills.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicantsTable;
