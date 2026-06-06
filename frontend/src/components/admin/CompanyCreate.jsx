"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"
import Navbar from "../shared/Navbar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner"
import {
  Building,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Target,
  Users,
} from "lucide-react"

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { singleCompany } = useSelector((store) => store.company)
 useEffect(() => {
  if (singleCompany) {
    navigate("/admin/companies");
  }
}, []);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name")
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      )
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.error("Company registration failed:", error)
      toast.error(error?.response?.data?.message || "Something went wrong while creating company.")
    } finally {
      setLoading(false)
    }
  }

  return (
    // Strict layout configuration to guarantee a lock on viewport layout overflow limits
    <div className="h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col overflow-hidden">
      <Navbar />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* MAIN CONTAINER: Shifted upwards with premium max-w-4xl sizing */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start px- 4 pt-4 md:pt-8 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Hero Section */}
              <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-8 flex flex-col justify-center relative overflow-hidden rounded-l-[32px]">
                <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute bottom-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-sm"></div>

                <div className="relative z-10 max-w-md">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4 border border-white/20">
                    <Building className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-xs font-medium">Company Registration</span>
                  </div>

                  <h2 className="text-3xl font-black mb-4 leading-tight">
                    Build Your<br />
                    <span className="text-yellow-300">Company</span><br />
                    Profile! 🏢
                  </h2>

                  <p className="text-sm text-white/90 mb-6 leading-relaxed">
                    Start your journey by creating a professional company profile that attracts top talent.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Professional company branding</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Attract qualified candidates</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Manage job postings efficiently</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-md mb-3">
                      <Building className="w-7 h-7 text-white" />
                    </div>

                    <h1 className="text-2xl font-black text-gray-900 mb-0.5">Create Company</h1>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      What would you like to name your company? Choose an identifiable brand title.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Company Name Field */}
                    <div className="space-y-0.5">
                      <Label className="text-gray-600 font-semibold text-[11px] flex items-center gap-1.5 mb-0.5">
                        <Building className="w-3.5 h-3.5 text-gray-400" />
                        Company Name
                      </Label>
                      <div className="relative">
                        <Input
                          id="companyName"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Google, Microsoft, Apple"
                          className="h-9.5 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 pl-4 w-full focus:ring-1 focus:ring-orange-400"
                          onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
                        />
                      </div>
                    </div>

                    {/* Integrated Horizontal Micro Features Bar */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="flex items-center space-x-2 p-2 bg-gray-50/60 rounded-xl border border-gray-100">
                        <Target className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="text-[10px] font-bold text-gray-700 truncate">Target Hiring</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50/60 rounded-xl border border-gray-100">
                        <Users className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        <span className="text-[10px] font-bold text-gray-700 truncate">Team Building</span>
                      </div>
                    </div>

                    {/* Action Buttons Stacking Layout Layer */}
                    <div className="flex gap-3 pt-1">
                      <Button
                        onClick={() => navigate("/admin/companies")}
                        variant="outline"
                        className="flex-1 h-9.5 border border-gray-200 text-gray-600 font-semibold rounded-xl text-xs transition-all duration-200"
                      >
                        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                        Cancel
                      </Button>
                      
                      <Button
                        onClick={registerNewCompany}
                        disabled={loading || !companyName.trim()}
                        className="flex-1 h-9.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Low Profile Inline Security Tagline */}
                    <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400 text-center leading-normal pt-1">
                      <Sparkles className="w-3 h-3 text-orange-400" />
                      <span>Unlock analytics and custom board templates upon profile validation</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate