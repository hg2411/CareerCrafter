"use client"

import { useState, useEffect } from "react"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import AdminJobTable from "./AdminJobTable"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"
import { setSearchJobByText } from "@/redux/jobSlice"
import {
  Search,
  Plus,
  Briefcase,
  Sparkles,
} from "lucide-react"

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input, dispatch])

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
        <div className="text-center mb-12">

          <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Manage Your
            </span>
            <br />
            Job Postings 💼
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create, edit, and track all your job postings from one powerful dashboard.
          </p>
        </div>

     

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rotate-45"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Job Directory</span>
                  </div>
                  <h2 className="text-3xl font-black mb-2">Your Job Postings</h2>
                  <p className="text-white/90 text-lg">Manage and track all your job openings</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => navigate("/admin/jobs/create")}
                    className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New Job
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="p-8 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search jobs by title, role, location, or company..."
                  className="pl-12 h-12 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400 bg-white shadow-sm"
                />
              </div>

            </div>
          </div>

          {/* Table Section */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                Job Directory
              </h3>
              <div className="text-sm text-gray-500">
                {input ? `Filtered results for "${input}"` : "Showing all jobs"}
              </div>
            </div>

            <AdminJobTable />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminJobs
