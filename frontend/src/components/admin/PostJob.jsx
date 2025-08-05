"use client"

import { useState } from "react"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
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
  Zap,
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
  const { companies = [] } = useSelector((store) => store.company)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const selectChangeHandler = (value) => {
    const selectCompany = companies.find((company) => company.name.toLowerCase() === value)
    if (selectCompany) {
      setInput({ ...input, companyId: selectCompany._id })
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      // Clean payload
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
      console.log("Cleaned Job Payload:", payload) // Final payload
      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
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

  // // Calculate completion percentage
  // const getCompletionPercentage = () => {
  //   const fields = [
  //     input.title,
  //     input.description,
  //     input.requirements,
  //     input.salary,
  //     input.location,
  //     input.jobType,
  //     input.experience,
  //     input.position,
  //     input.companyId,
  //     input.lastDate,
  //   ]
  //   const filledFields = fields.filter((field) => field && field.toString().trim()).length
  //   return Math.round((filledFields / fields.length) * 100)
  // }

  // const completionPercentage = getCompletionPercentage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Navbar />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-40 w-20 h-20 bg-yellow-200 rounded-full opacity-40 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <Button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="mb-6 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Jobs
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-gray-200">
              <Briefcase className="w-5 h-5 mr-2 text-orange-500" />
              <span className="text-gray-700 font-semibold">Job Posting</span>
            </div>

            <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Post Your Next
              </span>
              <br />
              Job Opening 🚀
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Create a compelling job posting to attract the best talent for your company.
            </p>
          </div>
        </div>

        {/* Progress Section */}
        {/* <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Job Posting Progress</h3>
            <span className="text-2xl font-black text-gray-900">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completionPercentage === 100
              ? "Perfect! Your job posting is complete."
              : "Fill in all fields to complete your job posting."}
          </p>
        </div> */}

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">REACH</div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">10K+</div>
            <div className="text-gray-600 font-semibold">Active Job Seekers</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">SUCCESS</div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">95%</div>
            <div className="text-gray-600 font-semibold">Match Rate</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">SPEED</div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">24h</div>
            <div className="text-gray-600 font-semibold">Avg Response</div>
          </div>
        </div> */}

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rotate-45"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Job Details</span>
              </div>
              <h2 className="text-3xl font-black mb-2">Create Job Posting</h2>
              <p className="text-white/90 text-lg">Fill in the details to attract the perfect candidates</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={submitHandler} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  Job Information
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      Job Title
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={input.title}
                      onChange={changeEventHandler}
                      placeholder="e.g. Senior Frontend Developer"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      Location
                    </Label>
                    <Input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="e.g. Bangalore, Remote, Hybrid"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Job Type */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      Job Type
                    </Label>
                    <Input
                      type="text"
                      name="jobType"
                      value={input.jobType}
                      onChange={changeEventHandler}
                      placeholder="e.g. Full-Time, Part-Time, Contract"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Salary */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      Salary (LPA)
                    </Label>
                    <Input
                      type="text"
                      name="salary"
                      value={input.salary}
                      onChange={changeEventHandler}
                      placeholder="e.g. 10-15 LPA"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <Star className="w-4 h-4 text-gray-500" />
                      Experience (Years)
                    </Label>
                    <Input
                      type="number"
                      name="experience"
                      value={input.experience}
                      onChange={changeEventHandler}
                      placeholder="e.g. 3"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Open Positions */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      Open Positions
                    </Label>
                    <Input
                      type="number"
                      name="position"
                      value={input.position}
                      onChange={changeEventHandler}
                      placeholder="e.g. 5"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Last Date */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      Application Deadline
                    </Label>
                    <Input
                      type="date"
                      name="lastDate"
                      value={input.lastDate}
                      onChange={changeEventHandler}
                      min={new Date().toISOString().split("T")[0]}
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900"
                      required
                    />
                  </div>

                  {/* Company Selection */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      Select Company
                    </Label>
                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900">
                        <SelectValue placeholder="Choose your company" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-xl">
                        <SelectGroup>
                          {companies.map((company) => (
                            <SelectItem
                              key={company._id}
                              value={company.name.toLowerCase()}
                              className="cursor-pointer hover:bg-orange-50 rounded-lg"
                            >
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    Job Description
                  </Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    Requirements & Skills
                  </Label>
                  <Input
                    type="text"
                    name="requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                    placeholder="e.g. React, Node.js, TypeScript, 3+ years experience"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Company Warning */}
              {companies.length === 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="text-red-800 font-semibold text-sm mb-1">Company Required</h4>
                      <p className="text-red-600 text-sm leading-relaxed mb-3">
                        You need to register a company before posting a job. Please create your company profile first.
                      </p>
                      <Button
                        type="button"
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        Create Company
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tips Section */}
              {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-blue-800 font-semibold text-sm mb-2">Job Posting Tips</h4>
                    <ul className="text-blue-600 text-sm space-y-1">
                      <li>• Write a clear and specific job title</li>
                      <li>• Include salary range to attract qualified candidates</li>
                      <li>• Be specific about required skills and experience</li>
                      <li>• Set a reasonable application deadline</li>
                    </ul>
                  </div>
                </div>
              </div> */}

              {/* Submit Button */}
              <div className="pt-4">
                {loading ? (
                  <Button
                    disabled
                    className="w-full h-14 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg opacity-50 cursor-not-allowed"
                  >
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Publishing Job...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={companies.length === 0}
                    className="w-full h-14 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <CheckCircle className="mr-2 h-6 w-6" />
                    Post Job Opening
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Quality Candidates</h4>
                <p className="text-gray-600">Attract pre-screened talent</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Fast Hiring</h4>
                <p className="text-gray-600">Reduce time-to-hire significantly</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Brand Visibility</h4>
                <p className="text-gray-600">Showcase your company culture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostJob
