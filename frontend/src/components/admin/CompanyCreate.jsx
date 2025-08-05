"use client"

import { useState } from "react"
import Navbar from "../shared/Navbar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"
import {
  Building,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Target,
  Users,
  TrendingUp,
  Star,
  Loader2,
} from "lucide-react"

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

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
          headers: {
            "Content-Type": "application/json",
          },
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
      console.log("Backend error response:", error?.response?.data)
      toast.error(error?.response?.data?.message || "Something went wrong while creating company.")
    } finally {
      setLoading(false)
    }
  }

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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
            <div className="flex flex-col lg:flex-row">
              {/* Left Hero Section */}
              <div className="lg:w-1/2 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/20 rotate-45"></div>
                <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/20 rounded-full"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
                    <Building className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Company Registration</span>
                  </div>

                  <h2 className="text-5xl font-black mb-6 leading-tight">
                    Build Your
                    <br />
                    <span className="text-yellow-300">Company</span>
                    <br />
                    Profile! 🏢
                  </h2>

                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    Start your journey by creating a professional company profile that attracts top talent.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Professional company branding</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Attract qualified candidates</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Manage job postings efficiently</span>
                    </div>
                  </div>

                  {/* Illustration placeholder */}
                  <div className="mt-12 relative">
                    <div className="w-48 h-32 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                      <Building className="w-16 h-16 text-white/60" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="lg:w-1/2 p-12">
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg mb-6">
                      <Building className="w-10 h-10 text-white" />
                    </div>

                    <h1 className="text-4xl font-black text-gray-900 mb-4">Create Company</h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      What would you like to name your company? Choose a name that represents your brand.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Company Name Field */}
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        Company Name
                      </Label>
                      <div className="relative">
                        <Input
                          id="companyName"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Google, Microsoft, Apple"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400 pl-4"
                          onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        This will be displayed on your company profile and job postings
                      </p>
                    </div>

                    {/* Benefits Preview */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <h4 className="text-blue-800 font-semibold text-sm mb-1">What's Next?</h4>
                          <ul className="text-blue-600 text-sm space-y-1">
                            <li>• Complete your company profile</li>
                            <li>• Add company logo and description</li>
                            <li>• Start posting job opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        onClick={() => navigate("/admin/companies")}
                        variant="outline"
                        className="flex-1 h-12 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Cancel
                      </Button>
                      <Button
                        onClick={registerNewCompany}
                        disabled={loading || !companyName.trim()}
                        className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Creating Company...
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Success Features */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-green-800">Targeted Hiring</div>
                      <div className="text-xs text-green-600 mt-1">Find the right talent</div>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-purple-800">Growth Tracking</div>
                      <div className="text-xs text-purple-600 mt-1">Monitor your progress</div>
                    </div>

                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-blue-800">Team Building</div>
                      <div className="text-xs text-blue-600 mt-1">Build your dream team</div>
                    </div>

                    <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-yellow-800">Brand Building</div>
                      <div className="text-xs text-yellow-600 mt-1">Enhance your reputation</div>
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
