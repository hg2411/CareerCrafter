"use client"

import { useState, useEffect } from "react"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import axios from "axios"
import { JOB_API_END_POINT } from "@/utils/constant"
import { useNavigate } from "react-router-dom"
import {
  Loader2,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Building,
  FileText,
  Target,
  Clock,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  Star,
  TrendingUp,
  ShieldCheck
} from "lucide-react"
import { toast } from "react-toastify"

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: 0,
    position: 0,
    companyId: "",
    lastDate: "",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { singleCompany } = useSelector((store) => store.company)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  
  useEffect(() => {
    if (singleCompany) {
      setInput((prev) => ({
        ...prev,
        companyId: singleCompany._id,
      }));
    }
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const payload = {
        title: input.title.trim(),
        description: input.description.trim(),
        requirements: input.requirements.trim(),
        salary: Number(input.salary),
        location: input.location.trim(),
        jobType: input.jobType.trim(),
        experience: Number(input.experience),
        position: Number(input.position),
        companyId: input.companyId,
        lastDate: input.lastDate,
      }
      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    // STRICT SCROLL-FREE CANVAS BOUNDARY
    <div className="h-screen max-h-screen bg-[#FAFAFA] flex flex-col overflow-hidden">
      <Navbar />

      {/* SPLIT PANEL WRAPPER LAYOUT */}
      <div className="flex-1 flex w-full overflow-hidden">
       {/* LEFT COLUMN: Deep Gradient Visual Analytics Showcase Panel */}
        <div className="hidden lg:flex lg:w-[35%] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-10 flex-col justify-between text-white relative overflow-hidden rounded-3xl shadow-xl">
          {/* Background Ambient Shapes */}
          <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-60 h-60 bg-black/10 rounded-full blur-xl"></div>

          {/* Top Block */}
          <div className="space-y-6 relative z-10">
            <Button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 px-4 h-9 rounded-xl text-xs font-bold transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover:-translate-x-0.5" />
              Back to Listings
            </Button>

            <div className="space-y-2 pt-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-yellow-300 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Publishing Console</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight leading-tight">
                Acquire Your Next <br />
                Industry Specialist 🚀
              </h1>
              <p className="text-white/80 text-xs font-medium leading-relaxed pt-1">
                Deploy granular skill requirements directly to our matching index pipelines to filter elite technical assets.
              </p>
            </div>
          </div>

          {/* Bottom Summary Metric Widgets */}
          <div className="space-y-3 relative z-10 border-t border-white/10 pt-6">
            <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase block">Deployment Security</span>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Pre-vetted Streams</h4>
                  <p className="text-white/70 text-[10px]">Attract pre-screened technical profiles.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
                <TrendingUp className="w-4 h-4 text-cyan-300 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Reduced Time-to-Hire</h4>
                  <p className="text-white/70 text-[10px]">Slash selection wait times by 40%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

     {/* RIGHT COLUMN: Expansive Clean Input Administration Entry Grid */}
     <div className="flex-1 bg-white p-6 md:p-8 flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 shadow-xl">
          <div className="w-full max-w-3xl mx-auto flex flex-col h-full justify-between overflow-hidden">
            
            {/* Top Workspace Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  Job Listing Configuration
                </h2>
                <p className="text-gray-400 text-xs font-semibold mt-0.5">Fill out parameters to declare current company openings.</p>
              </div>
              {singleCompany && (
                <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 text-orange-700 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <Building className="w-3.5 h-3.5 text-orange-600" />
                  <span>Branch: {singleCompany.name}</span>
                </div>
              )}
            </div>

            {/* SCROLLABLE CENTRAL INPUT GROUPS CANVAS */}
            <form onSubmit={submitHandler} id="splitPostJobForm" className="flex-1 overflow-y-auto py-5 pr-2 space-y-4 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3.5">
                
                {/* Job Title */}
                <div className="space-y-1 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl transition-all duration-200 focus-within:border-orange-400/60 focus-within:bg-white focus-within:shadow-md">
                  <Label className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                    Job Title Designation
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    placeholder="e.g. Senior Backend Engineer"
                    className="h-9 border-0 bg-transparent px-0 text-xs font-bold text-gray-900 placeholder-gray-400 shadow-none focus-visible:ring-0 focus-visible:border-transparent w-full"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-1 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl transition-all duration-200 focus-within:border-orange-400/60 focus-within:bg-white focus-within:shadow-md">
                  <Label className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    HQ Placement Node
                  </Label>
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="e.g. Bangalore, Remote"
                    className="h-9 border-0 bg-transparent px-0 text-xs font-bold text-gray-900 placeholder-gray-400 shadow-none focus-visible:ring-0 focus-visible:border-transparent w-full"
                  />
                </div>

                {/* Job Type */}
                <div className="space-y-1 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl transition-all duration-200 focus-within:border-orange-400/60 focus-within:bg-white focus-within:shadow-md">
                  <Label className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    Employment Type
                  </Label>
                  <Input
                    type="text"
                    name="jobType"
                    value={input.jobType}
                    onChange={changeEventHandler}
                    placeholder="e.g. Full-Time, Contract"
                    className="h-9 border-0 bg-transparent px-0 text-xs font-bold text-gray-900 placeholder-gray-400 shadow-none focus-visible:ring-0 focus-visible:border-transparent w-full"
                  />
                </div>

                {/* Salary */}
                <div className="space-y-1 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl transition-all duration-200 focus-within:border-orange-400/60 focus-within:bg-white focus-within:shadow-md">
                  <Label className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                    Expected Salary Range (LPA)
                  </Label>
                  <Input
                    type="text"
                    name="salary"
                    value={input.salary}
                    onChange={changeEventHandler}
                    placeholder="e.g. 15"
                    className="h-9 border-0 bg-transparent px-0 text-xs font-bold text-gray-900 placeholder-gray-400 shadow-none focus-visible:ring-0 focus-visible:border-transparent w-full"
                  />
                </div>

               {/* Experience */}
                <div className="space-y-1 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl transition-all duration-200 focus-within:border-orange-400/60 focus-within:bg-white focus-within:shadow-md">
                  <Label className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-gray-400" />
                    Required Experience (Years)
                  </Label>
                  <Input
                    type="number"
                    name="experience"
                    value={input.experience === 0 ? "" : input.experience}
                    onChange={changeEventHandler}
                    placeholder="0 (Fresher) or e.g. 3"
                    min={0}
                    className="h-9 border-0 bg-transparent px-0 text-xs font-bold text-gray-900 placeholder-gray-400 shadow-none focus-visible:ring-0 focus-visible:border-transparent w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                {/* Open Positions */}
                <div className="space-y-1 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl transition-all duration-200 focus-within:border-orange-400/60 focus-within:bg-white focus-within:shadow-md">
                  <Label className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    Target Headcount Volume
                  </Label>
                  <Input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                    placeholder="e.g. 2"
                    className="h-9 border-0 bg-transparent px-0 text-xs font-bold text-gray-900 placeholder-gray-400 shadow-none focus-visible:ring-0 focus-visible:border-transparent w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                {/* Application Deadline */}
                <div className="space-y-1 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl transition-all col-span-1 sm:col-span-2 duration-200 focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm">
                  <Label className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    Application Cutoff Deadline Date
                  </Label>
                  <Input
                    type="date"
                    name="lastDate"
                    value={input.lastDate}
                    onChange={changeEventHandler}
                    min={new Date().toISOString().split("T")[0]}
                    className="h-8 border-0 bg-transparent px-0 text-xs font-bold text-gray-900 shadow-none focus-visible:ring-0 focus-visible:border-transparent cursor-pointer w-full mt-0.5 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Core Skill Requirements Inline Row */}
              <div className="space-y-1 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl transition-all duration-200 focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-md">
                <Label className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-gray-400" />
                  Prerequisite Stack & Skillsets
                </Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  placeholder="e.g. React, Node.js, TypeScript, AWS Architecture"
                  className="h-8 border-0 bg-transparent px-0 text-xs font-bold text-gray-900 placeholder-gray-400 shadow-none focus-visible:ring-0 focus-visible:border-transparent w-full"
                />
              </div>

              {/* Detailed Role Bio Block */}
              <div className="space-y-1 bg-gray-50/50 border border-gray-100 p-3 rounded-2xl transition-all duration-200 focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-md">
                <Label className="text-gray-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  Comprehensive Job Description Summary
                </Label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Elaborate on operational duties, pipeline metrics, daily standup routines, and workspace culture..."
                  className="w-full h-16 max-h-16 min-h-16 bg-transparent text-xs font-bold text-gray-900 placeholder-gray-400 outline-none resize-none pt-1 scrollbar-none"
                  required
                />
              </div>
            </form>

            {/* LOWER FORM SUBMISSION CONTROLS ACTION STRIP */}
            <div className="pt-4 border-t border-gray-100 shrink-0 flex flex-col gap-3">
              {/* Conditional Alert Alerts Box Panel */}
              {!singleCompany ? (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-3 flex items-center justify-between gap-4 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-[10px]">!</div>
                    <span className="text-red-700 text-xs font-bold">Registration mandatory: Register a company node before publishing.</span>
                  </div>
                  <Button
                    type="button"
                    onClick={() => navigate("/admin/companies/create")}
                    className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-black px-3 h-10 rounded-xl shadow-sm shrink-0 transition-colors"
                  >
                    Setup Hub
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 px-1">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Deployment directory set to verified hub: <b className="text-green-800 font-black">{singleCompany.name}</b></span>
                </div>
              )}

              {/* Submit Execution Actions Row */}
              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => navigate("/admin/jobs")}
                  variant="outline"
                  className="h-10 px-5 border border-gray-200 text-gray-600 font-bold text-xs rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Discard Posting
                </Button>

                {loading ? (
                  <Button
                    disabled
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-md opacity-50 cursor-not-allowed min-w-[160px]"
                  >
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Deploying...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    form="splitPostJobForm"
                    disabled={!singleCompany}
                    className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-lg shadow-pink-500/10 transition-all active:scale-[0.98] flex items-center gap-1.5 min-w-[160px]"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Deploy Opening
                  </Button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default PostJob