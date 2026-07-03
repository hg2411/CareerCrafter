"use client"

import React, { useEffect, useState } from "react"
import Navbar from "./shared/Navbar"
import Job from "./Job"
import { useSelector } from "react-redux"
import useGetAllJobs from "../hooks/useGetAllJobs"
import { Sparkles, Briefcase } from "lucide-react"

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job)
  const [filterJobs, setFilterJob] = useState(allJobs || [])
  const fetchAllJobs = useGetAllJobs()

  // Fallback explicit helper logic mirroring your slice state checks
  const checkSalaryRange = (jobSalary, querySalary) => {
    if (!jobSalary || !querySalary) return true
    return String(jobSalary).toLowerCase().includes(String(querySalary).toLowerCase())
  }

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) 

    // Filter out expired jobs
    const nonExpiredJobs = allJobs.filter((job) => {
      if (!job.lastDate) return true // Keep jobs without lastDate
      const jobLastDate = new Date(job.lastDate)
      jobLastDate.setHours(0, 0, 0, 0)
      return jobLastDate >= today
    })

    // Apply user filters matching project schema
    if (
      searchedQuery &&
      typeof searchedQuery === "object" &&
      Object.keys(searchedQuery).length > 0
    ) {
      const filtered = nonExpiredJobs.filter((job) => {
        const matchesLocation = searchedQuery.Location
          ? job.location?.toLowerCase() === searchedQuery.Location.toLowerCase()
          : true

        const matchesIndustry = searchedQuery.Industry
          ? job.title?.toLowerCase().includes(searchedQuery.Industry.toLowerCase())
          : true

        const matchesSalary = searchedQuery.Salary
          ? checkSalaryRange(job.salary, searchedQuery.Salary)
          : true

        return matchesLocation && matchesIndustry && matchesSalary
      })

      setFilterJob(filtered)
    } else {
      setFilterJob(nonExpiredJobs)
    }
  }, [searchedQuery, allJobs])

  return (
    // Identical background gradient layout locking typography scaling from Login Component
    <div className="h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col overflow-hidden text-gray-900">
      <Navbar />

      {/* Decorative Background Circles - Copy-Pasted Exactly from Login layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>
      
      {/* Structural layout block mirroring modern dashboard views */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col overflow-hidden">
        {filterJobs.length === 0 ? (
          /* Empty State Screen mirroring Left-Hero section border styles */
          <div className="m-auto w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl border border-gray-100 text-center animate-fade-in">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-1">Job Not Found</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              We couldn't find any listings matching your search constraints. Try adjusting your parameters or filters.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Header segment matching login context style */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm">
              <div>
                <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 rounded-full px-2.5 py-1 mb-1 border border-orange-200/40">
                  <Sparkles className="w-3 h-3 mr-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Live Feeds</span>
                </div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">Explore Opportunities</h1>
              </div>

              {/* Exact dynamic pluralization metric block wrapped in matching signature button gradient */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md shadow-pink-500/10 w-fit">
                <span className="bg-white text-pink-600 font-extrabold px-2 py-0.5 rounded-full text-[10px]">
                  {filterJobs.length}
                </span>
                Active Job{filterJobs.length !== 1 && "s"}
              </div>
            </div>
            
            {/* Balanced grid section limiting viewport parameters */}
            <div className="flex-1 overflow-y-auto pr-2 pb-6 custom-page-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
                {filterJobs.map((job) => (
                  <div key={job?._id} className="h-full">
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-page-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-page-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-page-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  )
}

export default Jobs