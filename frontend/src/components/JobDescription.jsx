"use client"

import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant"
import { setSingleJob } from "@/redux/jobSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {
  MapPin,
  Users,
  Briefcase,
  IndianRupee,
  CalendarDays,
  FileText,
  ArrowLeft,
  MessageCircle,
  Clock,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Star,
  Eye,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.auth)
  const [userApplication, setUserApplication] = useState(null)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const applyJobHandler = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true })
      setLoading(false)
      if (res.data.success) {
        const newApp = res.data.application
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob.applications || []),
            {
              ...newApp,
              applicant: user?._id,
            },
          ],
        }
        dispatch(setSingleJob(updatedSingleJob))
        setUserApplication({ ...newApp, applicant: user?._id })
        toast.success(res.data.message)
      }
    } catch (error) {
      setLoading(false)
      if (error.response?.status === 409) {
        toast.info("You have already applied to this job.")
        const existing = singleJob?.applications?.find(
          (app) => app.applicant?._id === user?._id || app.applicant === user?._id,
        )
        setUserApplication(existing || null)
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong.")
      }
    }
  }

  const handleWithdraw = async () => {
    const confirm = window.confirm("Are you sure you want to withdraw your application?")
    if (!confirm) return

    try {
      setLoading(true)
      const res = await axios.delete(`${APPLICATION_API_END_POINT}/withdraw/${jobId}`, { withCredentials: true })
      setLoading(false)
      if (res.data.success) {
        toast.success("Application withdrawn successfully.")
        setUserApplication(null)
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: singleJob.applications.filter(
              (app) => app.applicant?._id !== user?._id && app.applicant !== user?._id,
            ),
          }),
        )
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message || "Failed to withdraw application.")
    }
  }

  const handleChatWithRecruiter = () => {
    if (singleJob?.created_by?._id) {
      navigate(`/chat/${singleJob.created_by._id}`)
    } else {
      toast.error("Recruiter information not available for this job.")
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          const foundApplication = res.data.job.applications?.find(
            (app) => app.applicant?._id === user?._id || app.applicant === user?._id,
          )
          setUserApplication(foundApplication || null)
        }
      } catch (error) {
        console.log(error)
        toast.error("Job not found or has been removed.")
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  useEffect(() => {
    if (singleJob?.applications && !userApplication) {
      const found = singleJob.applications.find(
        (app) => app.applicant?._id === user?._id || app.applicant === user?._id,
      )
      if (found) {
        setUserApplication(found)
      }
    }
  }, [singleJob, user?._id])

  const isApplied = !!userApplication

  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return { color: "bg-green-500", icon: CheckCircle, text: "Accepted", bgColor: "bg-green-50" }
      case "rejected":
        return { color: "bg-red-500", icon: XCircle, text: "Rejected", bgColor: "bg-red-50" }
      default:
        return { color: "bg-yellow-500", icon: AlertCircle, text: "Under Review", bgColor: "bg-yellow-50" }
    }
  }

  const statusInfo = getStatusInfo(userApplication?.status)
  const daysAgo = singleJob?.createdAt
    ? Math.floor((new Date() - new Date(singleJob.createdAt)) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Jobs
        </Button>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rotate-45"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Job Opportunity</span>
                  </div>

                  <h1 className="text-4xl font-black mb-4 leading-tight">{singleJob?.title}</h1>

                  <div className="flex items-center text-white/90 mb-6">
                    <Building className="w-5 h-5 mr-2" />
                    <span className="text-lg font-semibold">{singleJob?.company?.name || "Company Name"}</span>
                    <span className="mx-3">•</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{singleJob?.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-semibold">
                      <Users className="w-4 h-4 mr-2" />
                      {singleJob?.position} Position{singleJob?.position > 1 ? "s" : ""}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-semibold">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {singleJob?.jobType}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-semibold">
                      <IndianRupee className="w-4 h-4 mr-2" />
                      {singleJob?.salary} LPA
                    </Badge>
                    {singleJob?.lastDate && (
                      <Badge className="bg-yellow-400 text-yellow-900 px-4 py-2 text-sm font-semibold">
                        <Clock className="w-4 h-4 mr-2" />
                        Apply by {new Date(singleJob.lastDate).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Section */}
                <div className="flex flex-col items-end gap-4">
                  {isApplied ? (
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${statusInfo.bgColor} border-2 border-white/20 mb-3`}
                      >
                        <statusInfo.icon className={`w-5 h-5 ${statusInfo.color.replace("bg-", "text-")}`} />
                        <span className="font-bold text-gray-800">{statusInfo.text}</span>
                      </div>
                      <Button
                        onClick={handleWithdraw}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        {loading ? "Withdrawing..." : "Withdraw Application"}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={applyJobHandler}
                      disabled={loading}
                      className="bg-white text-orange-600 hover:bg-gray-50 font-black px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                          Applying...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Apply Now
                        </>
                      )}
                    </Button>
                  )}

                  <div className="flex items-center text-white/80 text-sm">
                    <Eye className="w-4 h-4 mr-2" />
                    <span>{singleJob?.applications?.length || 0} applicants</span>
                    <span className="mx-2">•</span>
                    <span>Posted {daysAgo === 0 ? "today" : `${daysAgo} days ago`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-700 text-xs">Growth</Badge>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Experience Level</h3>
                <p className="text-gray-600">{singleJob?.experience || "Not specified"}</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <Target className="w-8 h-8 text-green-600" />
                  <Badge className="bg-green-100 text-green-700 text-xs">Active</Badge>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Applications</h3>
                <p className="text-gray-600">{singleJob?.applications?.length || 0} candidates applied</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <Star className="w-8 h-8 text-purple-600" />
                  <Badge className="bg-purple-100 text-purple-700 text-xs">Premium</Badge>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Salary Range</h3>
                <p className="text-gray-600">₹{singleJob?.salary} LPA</p>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  Job Description
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">{singleJob?.description}</p>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Job Information</h3>
                  <DetailRow
                    label="Position"
                    value={singleJob?.title}
                    icon={<Briefcase className="w-5 h-5 text-orange-500" />}
                  />
                  <DetailRow
                    label="Location"
                    value={singleJob?.location}
                    icon={<MapPin className="w-5 h-5 text-pink-500" />}
                  />
                  <DetailRow
                    label="Job Type"
                    value={singleJob?.jobType}
                    icon={<Clock className="w-5 h-5 text-purple-500" />}
                  />
                  <DetailRow
                    label="Experience"
                    value={singleJob?.experience || "Not specified"}
                    icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Details</h3>
                  <DetailRow
                    label="Salary"
                    value={`₹${singleJob?.salary} LPA`}
                    icon={<IndianRupee className="w-5 h-5 text-green-500" />}
                  />
                  <DetailRow
                    label="Openings"
                    value={`${singleJob?.position} position${singleJob?.position > 1 ? "s" : ""}`}
                    icon={<Users className="w-5 h-5 text-cyan-500" />}
                  />
                  <DetailRow
                    label="Posted On"
                    value={new Date(singleJob?.createdAt).toLocaleDateString()}
                    icon={<CalendarDays className="w-5 h-5 text-indigo-500" />}
                  />
                  <DetailRow
                    label="Applications"
                    value={`${singleJob?.applications?.length || 0} received`}
                    icon={<FileText className="w-5 h-5 text-rose-500" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <Button
          onClick={handleChatWithRecruiter}
          className="fixed bottom-8 right-8 flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-6 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="hidden sm:inline">Chat with Recruiter</span>
        </Button>
      </div>
    </div>
  )
}

const DetailRow = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-1">
      <div className="font-semibold text-gray-600 text-sm">{label}</div>
      <div className="font-bold text-gray-900">{value}</div>
    </div>
  </div>
)

export default JobDescription
