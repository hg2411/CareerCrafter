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
  Sparkles,
  Users,
  Briefcase,
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-semibold text-gray-700">Setting up your experience...</p>
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
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-400",
      features: ["Browse thousands of jobs", "Apply with one click", "Track applications", "Get matched with roles"],
    },
    {
      id: "recruiter",
      title: "Recruiter",
      description: "Hiring top talent for your company",
      icon: Building,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-400",
      features: ["Post job openings", "Find qualified candidates", "Manage applications", "Build your team"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
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
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Choose Your Path</span>
                  </div>

                  <h2 className="text-5xl font-black mb-6 leading-tight">
                    What's Your
                    <br />
                    <span className="text-yellow-300">Career</span>
                    <br />
                    Goal? 🎯
                  </h2>

                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    Tell us whether you're looking for your next opportunity or building your dream team.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Personalized experience</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Tailored dashboard</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Relevant opportunities</span>
                    </div>
                  </div>

                  {/* Illustration placeholder */}
                  <div className="mt-12 relative">
                    <div className="w-48 h-32 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                      <Briefcase className="w-16 h-16 text-white/60" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="lg:w-1/2 p-12">
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg mb-6">
                      <Users className="w-10 h-10 text-white" />
                    </div>

                    <h1 className="text-4xl font-black text-gray-900 mb-4">Choose Your Role</h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Select your role and create a secure password to complete your profile.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Role Selection */}
                    <div className="space-y-4">
                      <label className="text-gray-700 font-semibold text-sm">I am a</label>
                      <div className="grid gap-4">
                        {roles.map((role) => (
                          <div
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 group ${
                              selectedRole === role.id
                                ? `bg-gradient-to-r ${role.bgGradient} ${role.borderColor} shadow-lg transform scale-105`
                                : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                  selectedRole === role.id
                                    ? `bg-gradient-to-r ${role.gradient} shadow-lg`
                                    : "bg-white border-2 border-gray-200 group-hover:border-gray-300"
                                }`}
                              >
                                <role.icon
                                  className={`w-6 h-6 ${selectedRole === role.id ? "text-white" : "text-gray-600"}`}
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{role.title}</h3>
                                <p className="text-gray-600 text-sm mb-3">{role.description}</p>
                                <div className="space-y-1">
                                  {role.features.slice(0, 2).map((feature, index) => (
                                    <div key={index} className="flex items-center text-xs text-gray-500">
                                      <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                                      {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {selectedRole === role.id && (
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-gray-700 font-semibold text-sm">Create Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a secure password"
                          className="pl-12 pr-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleCreateAccount}
                      disabled={loading || !selectedRole || password.length < 6}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Setting up your account...
                        </>
                      ) : (
                        <>
                          Complete Setup
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Security Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Lock className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <h4 className="text-blue-800 font-semibold text-sm mb-1">Secure & Private</h4>
                          <p className="text-blue-600 text-sm leading-relaxed">
                            Your password is encrypted and stored securely. We never share your personal information.
                          </p>
                        </div>
                      </div>
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
