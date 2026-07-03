import React, { useEffect, useState } from "react"
import Job from "./Job"
import Navbar from "./shared/Navbar"
import { Sparkles, Bookmark } from "lucide-react"

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([])

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || []
    setSavedJobs(jobs)
  }, [])

  const handleRemove = (id) => {
    const updatedJobs = savedJobs.filter((job) => job._id !== id)
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs))
    setSavedJobs(updatedJobs)
  }

  return (
    // Matching background layout locking viewport parameters precisely to match Jobs.jsx layout
    <div className="h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col overflow-hidden text-gray-900">
      
      {/* Navbar Container */}
      <div className="w-full z-50">
        <Navbar />
      </div>

      {/* Decorative Background Circles - Unified design continuity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* Main Page Area Container */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col overflow-hidden">
        {savedJobs.length === 0 ? (
          /* High-Fidelity Empty State matching project system cards */
          <div className="m-auto w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl border border-gray-100 text-center animate-fade-in">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-1">No Saved Jobs</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              You haven't bookmarked any opportunities yet. Explore the job feed to save options for later.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Header Block Section */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm">
              <div>
                <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 rounded-full px-2.5 py-1 mb-1 border border-orange-200/40">
                  <Sparkles className="w-3 h-3 mr-1 text-orange-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider font-sans">Bookmarks</span>
                </div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">Your Saved Openings</h1>
              </div>

              {/* Dynamic Plural Counter Tag wrapped in design-system signature gradient */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md shadow-pink-500/10 w-fit">
                <span className="bg-white text-pink-600 font-extrabold px-2 py-0.5 rounded-full text-[10px]">
                  {savedJobs.length}
                </span>
                Bookmarked Position{savedJobs.length !== 1 && "s"}
              </div>
            </div>

            {/* Smooth Dynamic Layout Stream */}
            <div className="flex-1 overflow-y-auto pr-2 pb-6 custom-saved-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
                {savedJobs.map((job) => (
                  <div key={job?._id} className="h-full">
                    <Job
                      job={job}
                      onRemove={() => handleRemove(job?._id)}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Scrollbar Engine Injector */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-saved-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-saved-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-saved-scrollbar::-webkit-scrollbar-thumb {
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

export default SavedJobs