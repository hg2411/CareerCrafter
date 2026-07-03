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
  X
} from "lucide-react"

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Debounce search input to avoid laggy Redux dispatches on every keystroke
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setSearchJobByText(input))
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [input, dispatch])

  const handleClearSearch = () => {
    setInput("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 text-gray-800 antialiased selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* Modern, non-distracting background glow shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Manage Your{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Job Postings
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Create, edit, and track all your organizational career opportunities from a single dashboard.
          </p>
        </div>

        {/* Main Content Dashboard */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Dashboard Hero Banner */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-6 sm:p-8 relative overflow-hidden">
            {/* Soft geometric styling overlays */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-12 -translate-y-12"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full"></div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-3 py-1 mb-3 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-orange-200" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-100">Workspace</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Active Directories</h2>
                <p className="text-white/80 text-sm sm:text-base mt-1">Easily filter, review, or spin up new listings.</p>
              </div>

              <div>
                <Button
                  onClick={() => navigate("/admin/jobs/create")}
                  className="w-full sm:w-auto bg-white text-gray-900 hover:bg-slate-50 font-semibold px-6 py-5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <Plus className="w-5 h-5 text-orange-500 stroke-[3]" />
                  Post a New Job
                </Button>
              </div>
            </div>
          </div>

          {/* Search Management Controls */}
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/70">
            <div className="w-full max-w-2xl relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors w-5 h-5" />
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search jobs by title, department, location, or tech stack..."
                className="pl-12 pr-10 h-12 rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500/20 text-gray-900 placeholder-slate-400 bg-white shadow-sm transition-all text-base"
              />
              {input && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full hover:bg-slate-100"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Content Table Area */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shadow-inner">
                  <Briefcase className="w-4 h-4" />
                </div>
                Job Board Listings
              </h3>
              
              <div className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600 self-start sm:self-auto">
                {input ? (
                  <span>Filtered results for <strong className="text-slate-900">"{input}"</strong></span>
                ) : (
                  "Showing all compiled positions"
                )}
              </div>
            </div>

            {/* Rendered Job List */}
            <div className="rounded-xl border border-slate-100 overflow-hidden bg-white">
              <AdminJobTable />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminJobs