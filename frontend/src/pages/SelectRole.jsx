"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../redux/authSlice"
import {
  GraduationCap,
  Building,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Users,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SelectRole = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedRole, setSelectedRole] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkingUser, setCheckingUser] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/auth/me", { withCredentials: true })
        const user = res.data?.user
        dispatch(setUser(user))
        if (user?.role && user?.hasPassword) {
          if (user.role === "student") navigate("/")
          else navigate("/admin/companies")
        } else {
          setCheckingUser(false)
        }
      } catch (error) {
        console.error("User not logged in or error:", error)
        navigate("/login")
      }
    }
    checkUser()
  }, [navigate, dispatch])

  const handleCreateAccount = async () => {
    if (!selectedRole) {
      alert("Please select a role.")
      return
    }
    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters.")
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/auth/set-role-and-password",
        { role: selectedRole, password },
        { withCredentials: true },
      )
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        if (selectedRole === "student") navigate("/")
        else navigate("/admin/companies")
      }
    } catch (error) {
      console.error("Failed to set role & password:", error.response || error)
      alert(error?.response?.data?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  if (checkingUser) {
    return (
      <div className="h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-spin mx-auto mb-3 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <p className="text-lg font-semibold text-gray-700">Setting up your experience...</p>
        </div>
      </div>
    )
  }

  const roles = [
    {
      id: "student",
      title: "Job Seeker",
      description: "Looking for amazing career opportunities",
      icon: GraduationCap,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50/70 to-cyan-50/70",
      borderColor: "border-blue-400",
    },
    {
      id: "recruiter",
      title: "Recruiter",
      description: "Hiring top talent for your company",
      icon: Building,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50/70 to-teal-50/70",
      borderColor: "border-emerald-400",
    },
  ]

  return (
    // Strict layout lockdown to enforce viewport size safety limits
    <div className="h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* MAIN CONTAINER: Shifted upwards using flex align layers */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pt-4 md:pt-8 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Hero Section */}
              <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-8 flex flex-col justify-center relative overflow-hidden rounded-l-[32px]">
                <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute bottom-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-sm"></div>

                <div className="relative z-10 max-w-md">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4 border border-white/20">
                    <Users className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-xs font-medium">Choose Your Path</span>
                  </div>

                  <h2 className="text-3xl font-black mb-4 leading-tight">
                    What's Your<br />
                    <span className="text-yellow-300">Career</span><br />
                    Goal? 🎯
                  </h2>

                  <p className="text-sm text-white/90 mb-6 leading-relaxed">
                    Tell us whether you're looking for your next opportunity or building your dream team.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Personalized experience</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Tailored dashboard</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Relevant opportunities</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              {/* Using max-w-md style parameters to elongate fields cleanly */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-md mb-3">
                      <Users className="w-7 h-7 text-white" />
                    </div>

                    <h1 className="text-2xl font-black text-gray-900 mb-0.5">Choose Your Role</h1>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Select your layout path and set a password to complete your profile.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Role Selection Blocks - Made bigger with larger text and inner layout heights */}
                    <div className="space-y-1">
                      <label className="text-gray-600 font-semibold text-[11px]">I am a</label>
                      <div className="grid gap-2.5">
                        {roles.map((role) => (
                          <div
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 group flex items-center justify-between ${
                              selectedRole === role.id
                                ? `bg-gradient-to-r ${role.bgGradient} ${role.borderColor} shadow-md transform scale-[1.01]`
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100/80"
                            }`}
                          >
                            <div className="flex items-center space-x-4 truncate">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                  selectedRole === role.id
                                    ? `bg-gradient-to-r ${role.gradient} text-white shadow-md`
                                    : "bg-white border-2 border-gray-200 text-gray-500"
                                }`}
                              >
                                <role.icon className="w-5 h-5" />
                              </div>
                              <div className="truncate">
                                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{role.title}</h3>
                                <p className="text-gray-500 text-xs truncate">{role.description}</p>
                              </div>
                            </div>

                            {selectedRole === role.id && (
                              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 ml-2 animate-bounce-short" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-0.5">
                      <label className="text-gray-600 font-semibold text-[11px]">Create Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a secure password"
                          className="pl-11 pr-11 h-9.5 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 w-full focus:ring-1 focus:ring-orange-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 pt-0.5">Password must be at least 6 characters long</p>
                    </div>

                    {/* Action Block - Submit and Back Buttons Stacked Layer */}
                    <div className="space-y-2 pt-1">
                      {/* Submit Button */}
                      <Button
                        onClick={handleCreateAccount}
                        disabled={loading || !selectedRole || password.length < 6}
                        className="w-full h-9.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5"></div>
                            Setting up your account...
                          </>
                        ) : (
                          <>
                            Complete Setup
                            <ArrowRight className="ml-1.5 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      {/* Integrated Back Button */}
                      <Button
                        type="button"
                        onClick={() => navigate("/login")}
                        variant="outline"
                        className="w-full h-9.5 border border-gray-200 text-gray-600 font-semibold rounded-xl text-xs transition-all duration-200"
                      >
                        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                        Back to Login
                      </Button>
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
export default SelectRole