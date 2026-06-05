"use client"

import { useState, useEffect } from "react"
import Navbar from "./shared/Navbar"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "./ui/button"
import {
  Mail,
  Phone,
  FileText,
  CheckCircle,
  Eye,
  Download,
  Edit3,
  Target,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react"
import { Badge } from "./ui/badge"
import AppliedJobTable from "./AppliedJobTable"
import UpdateProfileDialogue from "./UpdateProfileDialogue"
import { useSelector } from "react-redux"
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs"
import { calculateProfileCompletion } from "@/utils/calculateProfileCompletion"

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const [showMissing, setShowMissing] = useState(false)
  const { user } = useSelector((store) => store.auth)
  const allAppliedJobs = useSelector((store) => store.job.allAppliedJobs) || []
  const { percentage: completion, missingFields } = calculateProfileCompletion(user)

  const memberSince = user?.createdAt ? new Date(user.createdAt).getFullYear() : "2025"
  const resumeUpdatedAt = user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "Recently"
  const profileLocation = user?.profile?.location || user?.profile?.city || "Location not provided"

  return (
    // Unified platform layout with identical background gradients and ambient blurs
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-gray-900 relative overflow-x-hidden antialiased font-sans">
      
      {/* Decorative Brand Ambience Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Profile Header Card wrapped in the brand signature rounded layout */}
        <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 p-6 sm:p-8 mb-8 backdrop-blur-md bg-white/95">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 sm:gap-8">
            
            {/* Profile Image & Brand Badging Badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 w-full lg:w-auto">
              <div className="relative flex-shrink-0">
                <Avatar className="h-24 w-24 border-4 border-white shadow-xl ring-1 ring-gray-100 block overflow-visible">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "/placeholder.svg?height=96&width=96"}
                    className="rounded-full object-cover w-full h-full"
                  />
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                  <CheckCircle className="w-4 h-4 text-white fill-current" />
                </div>
              </div>

              <div className="text-center sm:text-left">
                <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 rounded-full px-2.5 py-0.5 mb-2 border border-orange-200/30">
                  <Sparkles className="w-3 h-3 mr-1 text-orange-500" />
                  <span className="text-[9px] font-bold tracking-wider uppercase">Verified Candidate</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{user?.fullname}</h1>
                <p className="text-gray-500 text-xs sm:text-sm mt-1.5 max-w-md font-medium leading-relaxed">
                  {user?.profile?.bio || "Add a short bio to tell recruiters what you're looking for."}
                </p>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-gray-400 mt-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-500" />
                    <span className="capitalize">{profileLocation}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-500" />
                    <span>Member since {memberSince}</span> 
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons styled like the primary form vectors */}
            <div className="flex gap-3 w-full sm:w-auto sm:ml-auto mt-4 lg:mt-0">
              <Button
                onClick={() => setOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-5 h-9 rounded-xl font-bold text-xs shadow-md shadow-pink-500/10 transition-all duration-200 active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Column Workspace Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Main Stream Body */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Contact Information Cards mapped directly onto form wrappers */}
            <div className="bg-white rounded-[24px] shadow-md border border-gray-100 p-6">
              <div className="mb-4">
                <h2 className="text-base font-black text-gray-900 tracking-tight">Contact Details</h2>
                <p className="text-[11px] text-gray-400 font-medium">Your platform accessibility endpoints.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200/50 rounded-xl">
                  <div className="w-9 h-9 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</p>
                    <p className="text-xs font-bold text-gray-800 truncate mt-0.5">{user?.email || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200/50 rounded-xl">
                  <div className="w-9 h-9 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone Number</p>
                    <p className="text-xs font-bold text-gray-800 truncate mt-0.5">{user?.phoneNumber || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Expertise Segment */}
            <div className="bg-white rounded-[24px] shadow-md border border-gray-100 p-6">
              <div className="mb-5">
                <h2 className="text-base font-black text-gray-900 tracking-tight">Skills & Core Expertise</h2>
                <p className="text-[11px] text-gray-400 font-medium">Verified professional technology attributes.</p>
              </div>

              {user?.profile?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.profile.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="px-3 py-1 text-xs bg-gray-50 text-gray-600 border border-gray-200/60 font-bold rounded-lg hover:bg-orange-500/5 hover:text-orange-600 hover:border-orange-500/20 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl">
                  <Target className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-700">No core skills linked yet</p>
                  <p className="text-[11px] text-gray-400 max-w-xs mx-auto mt-0.5">Link your skills inside profile updates to populate matching engines.</p>
                </div>
              )}
            </div>

            {/* Application Registry Streams */}
            <div className="bg-white rounded-[24px] shadow-md border border-gray-100 p-6 overflow-hidden">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-black text-gray-900 tracking-tight">Recent Applications</h2>
                  <p className="text-[11px] text-gray-400 font-medium">History track of all deployed processing pipelines.</p>
                </div>
                <div className="bg-purple-500/10 text-purple-700 font-mono text-xs font-black px-2 py-0.5 rounded-lg border border-purple-500/10">
                  {allAppliedJobs.length}
                </div>
              </div>
              <div className="overflow-x-auto pt-2">
                <AppliedJobTable />
              </div>
            </div>
          </div>

          {/* Right Column Sidebar Panel */}
          <div className="space-y-6">
            
            {/* Progress Engine tracking component mapping */}
            <div className="bg-white rounded-[24px] shadow-md border border-gray-100 p-6">
              <h3 className="text-sm font-black text-gray-900 tracking-tight mb-3">Profile Completion</h3>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between font-bold text-xs text-gray-500">
                  <span>Profile Strength</span>
                  <span className="text-gray-900 font-mono font-black">{completion}%</span>
                </div>
                
                {/* Clean inline linear progress bar matching login metrics */}
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200/40">
                  <div
                    className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>

                {missingFields.length > 0 && (
                  <div className="pt-2 border-t border-gray-50">
                    <button
                      type="button"
                      onClick={() => setShowMissing(!showMissing)}
                      className="text-xs text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 focus:outline-none"
                    >
                      {showMissing ? "Collapse summary" : "Review recommendations"} ({missingFields.length})
                    </button>
                    {showMissing && (
                      <div className="space-y-1.5 mt-3 max-h-40 overflow-y-auto pr-1">
                        {missingFields.map((field, index) => (
                          <div key={index} className="flex items-center text-[11px] font-semibold text-gray-500 bg-gray-50 p-1.5 border border-gray-200/40 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2 flex-shrink-0"></div>
                            <span className="truncate">Add {field}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Document / Resume Infrastructure card */}
            {user?.profile?.resume && (
              <div className="bg-white rounded-[24px] shadow-md border border-gray-100 p-6">
                <h3 className="text-sm font-black text-gray-900 tracking-tight mb-3">Active Resume</h3>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200/50 rounded-xl">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {user.profile.resumeOriginalName || "Resume.pdf"}
                    </p>
                    <p className="text-[10px] font-semibold text-gray-400 mt-0.5">Updated {resumeUpdatedAt}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-4">
                  <a target="_blank" rel="noopener noreferrer" href={user.profile.resume} className="w-full">
                    <Button variant="outline" size="sm" className="w-full h-8 rounded-xl text-[11px] font-bold bg-transparent border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View
                    </Button>
                  </a>
                  <a href={user.profile.resume} download className="w-full">
                    <Button size="sm" className="w-full h-8 rounded-xl text-[11px] font-bold bg-slate-900 text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:border-transparent transition-all duration-200 shadow-sm shadow-slate-900/10">
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Download
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile