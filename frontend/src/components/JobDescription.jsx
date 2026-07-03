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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 text-sm rounded-xl shadow border border-gray-200 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back
          </Button>

          <div className="flex items-center gap-3 text-gray-600 text-xs bg-white/60 px-3 py-1.5 rounded-lg border border-gray-200/50">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {singleJob?.applications?.length || 0} applicants</span>
            <span>•</span>
            <span>Posted {daysAgo === 0 ? "today" : `${daysAgo} days ago`}</span>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          
          {/* LEFT/TOP HERO SIDE: Main Job Header Card */}
          <div className="lg:col-span-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-5 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
              <div>
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-0.5 mb-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">Job Opportunity</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-black mb-1 leading-tight tracking-tight">{singleJob?.title}</h1>
                
                <div className="flex items-center text-white/95 text-sm font-medium mb-4">
                  <Building className="w-4 h-4 mr-1.5" />
                  <span>{singleJob?.company?.name || "Company Name"}</span>
                  <span className="mx-2">•</span>
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  <span>{singleJob?.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-white/20">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-none text-xs px-2.5 py-1">
                  <Users className="w-3.5 h-3.5 mr-1" /> {singleJob?.position} Openings
                </Badge>
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-none text-xs px-2.5 py-1">
                  <Briefcase className="w-3.5 h-3.5 mr-1" /> {singleJob?.jobType}
                </Badge>
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-none text-xs px-2.5 py-1">
                  <IndianRupee className="w-3.5 h-3.5 mr-1" /> {singleJob?.salary} LPA
                </Badge>
                {singleJob?.lastDate && (
                  <Badge className="bg-yellow-400 text-yellow-900 border-none text-xs px-2.5 py-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 mr-1" /> Ends: {new Date(singleJob.lastDate).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT/TOP ACTION SIDE: Application Controller */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 flex flex-col justify-between min-h-[185px]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Application Status</h3>
              {isApplied ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 mb-4">
                  <statusInfo.icon className={`w-4 h-4 ${statusInfo.color.replace("bg-", "text-")}`} />
                  <span className="font-bold text-sm text-gray-700">{statusInfo.text}</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">You haven't submitted an application for this position yet.</p>
              )}
            </div>

            <div>
              {isApplied ? (
                <Button
                  onClick={handleWithdraw}
                  disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md"
                >
                  {loading ? "Withdrawing..." : "Withdraw Application"}
                </Button>
              ) : (
                <Button
                  onClick={applyJobHandler}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black py-3 rounded-xl text-md shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Applying...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Apply Now
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* BOTTOM MAIN DETAILS SIDE */}
          <div className="lg:col-span-2 space-y-4">
            {/* Job Description Card */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <h2 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
                  <FileText className="w-3..5 h-3.5 text-white" />
                </div>
                Job Description
              </h2>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{singleJob?.description}</p>
              </div>
            </div>
          </div>

          {/* BOTTOM QUICK SPECIFICATIONS SIDE */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Specifications</h3>
              <div className="grid grid-cols-1 gap-2">
                <DetailRow
                  label="Experience Level"
                  value={singleJob?.experience || "Not specified"}
                  icon={<TrendingUp className="w-4 h-4 text-blue-500" />}
                />
                <DetailRow
                  label="Job Type"
                  value={singleJob?.jobType}
                  icon={<Clock className="w-4 h-4 text-purple-500" />}
                />
                <DetailRow
                  label="Salary Scope"
                  value={`₹${singleJob?.salary} LPA`}
                  icon={<IndianRupee className="w-4 h-4 text-green-500" />}
                />
                <DetailRow
                  label="Posted On"
                  value={singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : "N/A"}
                  icon={<CalendarDays className="w-4 h-4 text-indigo-500" />}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Floating Chat Action */}
        <Button
          onClick={handleChatWithRecruiter}
          className="fixed bottom-6 right-6 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-4 py-3 rounded-xl shadow-xl transition-all duration-300 z-50 text-sm"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat with Recruiter</span>
        </Button>
      </div>
    </div>
  )
}

const DetailRow = ({ label, value, icon }) => (
  <div className="flex items-center gap-3 p-2.5 bg-gray-50/50 rounded-xl border border-gray-100 transition-all">
    <div className="flex-shrink-0 p-1.5 bg-white rounded-lg shadow-sm border border-gray-100">{icon}</div>
    <div className="flex-1 min-w-0">
      <div className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">{label}</div>
      <div className="font-bold text-gray-800 text-xs truncate">{value}</div>
    </div>
  </div>
)

export default JobDescription