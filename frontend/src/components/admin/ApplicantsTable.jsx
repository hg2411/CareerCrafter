"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { MoreHorizontal, CheckCircle2, XCircle, TrendingUp, Users } from "lucide-react"
import { useSelector } from "react-redux"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner"

const shortlistingStatus = [
  {
    label: "Accepted",
    icon: <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" title="Accepted" />,
  },
  {
    label: "Rejected",
    icon: <XCircle className="w-4 h-4 text-red-600 mr-2" title="Rejected" />,
  },
]

const ApplicantsTable = ({ jobId, job }) => {
  const { applicants } = useSelector((store) => store.application)
  const [filterText, setFilterText] = useState("")
  const [selectingId, setSelectingId] = useState(null)

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true },
      )
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  const handleSelectStudent = async (studentId, jobId) => {
    try {
      setSelectingId(studentId)
      const res = await axios.post(
        "http://localhost:8000/api/v1/job/select-student",
        { studentId, jobId },
        { withCredentials: true },
      )
      if (res.data.success) {
        toast.success(res.data.message || "Student selected & email sent!")
      } else {
        toast.error(res.data.message || "Failed to select student")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong")
    } finally {
      setSelectingId(null)
    }
  }

  const filteredApplicants = applicants?.applications?.filter((item) => {
    const search = filterText.trim().toLowerCase()
    if (!search) return true
    const name = item?.applicant?.fullname?.toLowerCase() || ""
    const email = item?.applicant?.email?.toLowerCase() || ""
    return name.includes(search) || email.includes(search)
  }) || []

  const selectedCount = applicants?.applications?.filter((item) => item?.status === "accepted").length || 0
  const rejectedCount = applicants?.applications?.filter((item) => item?.status === "rejected").length || 0
  const pendingCount = applicants?.applications?.filter((item) => !item?.status || item?.status === "applied").length || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-30"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-25"></div>
      <div className="absolute bottom-20 right-40 w-16 h-16 bg-yellow-200 rounded-full opacity-40"></div>

      {/* Floating shapes */}
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-orange-400 rotate-45 animate-bounce"></div>
      <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-purple-400 rotate-45 animate-bounce delay-300"></div>

      <div className="relative z-10 max-w-6xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 bg-white/80 text-slate-700 px-4 py-2 rounded-full shadow-sm mb-6">
            <Users className="w-5 h-5 text-slate-900" />
            <span className="text-sm font-semibold">{job?.title || 'Job opening'}</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Applicants
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
            {job?.company?.name
              ? `${job.company.name} · ${job.location || 'Remote / mixed location'}`
              : 'Review candidate applications and move them through your hiring pipeline.'}
          </p>

          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <div className="rounded-3xl bg-white/90 p-5 shadow border border-gray-100">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Total Applicants</p>
              <p className="text-3xl font-bold text-slate-900">{applicants?.applications?.length || 0}</p>
            </div>
            <div className="rounded-3xl bg-white/90 p-5 shadow border border-gray-100">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Accepted</p>
              <p className="text-3xl font-bold text-emerald-600">{selectedCount}</p>
            </div>
            <div className="rounded-3xl bg-white/90 p-5 shadow border border-gray-100">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Rejected</p>
              <p className="text-3xl font-bold text-rose-600">{rejectedCount}</p>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <input
              type="search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search by name or email"
              className="w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="font-semibold">Showing</span>
            <span className="px-3 py-2 rounded-full bg-white/90 border border-gray-200">{filteredApplicants.length}</span>
            <span>of</span>
            <span className="px-3 py-2 rounded-full bg-white/90 border border-gray-200">{applicants?.applications?.length || 0}</span>
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Applicants Overview</h2>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {applicants?.applications?.length || 0} candidates
                </span>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="p-8">
            <div className="overflow-x-auto">
              <Table className="rounded-2xl overflow-hidden text-sm">
                <TableCaption className="text-gray-500 text-xs pb-4 font-medium">
                  A list of your recently applied users
                </TableCaption>
                <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <TableRow className="border-b-2 border-gray-200">
                    <TableHead className="font-bold text-gray-700 py-4">Full Name</TableHead>
                    <TableHead className="font-bold text-gray-700 py-4">Email</TableHead>
                    <TableHead className="font-bold text-gray-700 py-4">Contact</TableHead>
                    <TableHead className="font-bold text-gray-700 py-4">Resume</TableHead>
                    <TableHead className="font-bold text-gray-700 py-4">Date</TableHead>
                    <TableHead className="font-bold text-gray-700 py-4">Status</TableHead>
                    <TableHead className="text-right font-bold text-gray-700 py-4">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicants?.applications?.map((item) => {
                    const isSelected = item?.status?.toLowerCase() === "selected" || item?.status?.toLowerCase() === "accepted"
                    return (
                      <TableRow
                        key={item._id}
                        className={`hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 ${
                          isSelected ? "bg-gradient-to-r from-green-50 to-emerald-50" : ""
                        } transition-all duration-300 border-b border-gray-100`}
                      >
                        <TableCell className="py-6 font-medium text-gray-900">{item?.applicant?.fullname}</TableCell>
                        <TableCell className="py-6">
                          <a
                            href={`mailto:${item?.applicant?.email}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                          >
                            {item?.applicant?.email}
                          </a>
                        </TableCell>
                        <TableCell className="py-6 text-gray-700">{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell className="py-6">
                          {item?.applicant?.profile?.resume ? (
                            <>
                              <a
                                href={item.applicant.profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                              >
                                {item.applicant.profile.resumeOriginalName}
                              </a>
                              <a
                                href={item.applicant.profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
                              >
                                Open
                              </a>
                            </>
                          ) : (
                            <span className="text-gray-400 italic">NA</span>
                          )}
                        </TableCell>
                        <TableCell className="py-6 text-gray-700">
                          {new Date(item?.createdAt).toLocaleDateString("en-IN")}
                        </TableCell>
                        <TableCell className="py-6">
                          <span
                            className={`px-3 py-2 rounded-full text-xs font-bold shadow-lg ${
                              item.status?.toLowerCase() === "accepted" || item.status?.toLowerCase() === "selected"
                                ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                                : item.status?.toLowerCase() === "rejected"
                                  ? "bg-gradient-to-r from-red-400 to-pink-500 text-white"
                                  : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                            }`}
                          >
                            {item.status || "Applied"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-6">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="p-3 rounded-full hover:bg-gradient-to-r hover:from-orange-100 hover:to-pink-100 transition-all duration-300 hover:shadow-lg">
                                <MoreHorizontal className="w-5 h-5 text-gray-600" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 bg-white border-2 border-gray-100 rounded-2xl shadow-2xl p-2">
                              {shortlistingStatus.map(({ label, icon }, index) => (
                                <div
                                  key={index}
                                  className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 rounded-xl cursor-pointer text-sm text-gray-700 font-medium transition-all duration-300"
                                  onClick={() => statusHandler(label, item?._id)}
                                >
                                  {icon}
                                  <span>{label}</span>
                                </div>
                              ))}
                              {isSelected ? (
                                <div className="flex items-center px-4 py-3 text-green-600 text-sm font-medium">
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Already Selected
                                </div>
                              ) : (
                                <div
                                  className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-xl cursor-pointer text-sm text-gray-700 font-medium transition-all duration-300"
                                  onClick={() => handleSelectStudent(item?.applicant?._id, jobId)}
                                >
                                  {selectingId === item?.applicant?._id ? (
                                    <svg className="animate-spin h-4 w-4 mr-2 text-gray-600" viewBox="0 0 24 24">
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
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default ApplicantsTable
