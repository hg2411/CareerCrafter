"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import Navbar from "../shared/Navbar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import {
  Loader2,
  User,
  Mail,
  Phone,
  Lock,
  Upload,
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
} from "lucide-react"
import { USER_API_END_POINT } from "@/utils/constant"
import { setLoading } from "@/redux/authSlice"
import { SiGoogle } from "react-icons/si"

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  })
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)
  const { loading, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)
  const isValidPhone = (phone) => /^\d{10}$/.test(phone)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const sendOtpHandler = async (e) => {
    e.preventDefault()
    const { fullname, email, phoneNumber, password, role } = input

    if (!fullname || !email || !phoneNumber || !password || !role) {
      toast.error("Please fill in all fields.")
      return
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.")
      return
    }

    if (!isValidPhone(phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits.")
      return
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register/send-otp`, { email }, { withCredentials: true })
      if (res.data.success) {
        toast.success(res.data.message)
        setStep(2)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Failed to send OTP")
    } finally {
      dispatch(setLoading(false))
    }
  }

  const verifyAndRegisterHandler = async (e) => {
    e.preventDefault()
    if (!otp) {
      toast.error("Please enter the OTP sent to your email.")
      return
    }

    try {
      dispatch(setLoading(true))
      const formData = new FormData()
      Object.entries(input).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })
      formData.append("otp", otp)

      const res = await axios.post(`${USER_API_END_POINT}/register/verify-otp`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Registration failed")
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) navigate("/")
  }, [user, navigate])

  const googleSignupHandler = () => {
    window.location.href = "http://localhost:8000/api/v1/user/auth/google"
  }

  const roles = ["student", "recruiter"]

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

                <div className="relative z-10">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Join Our Community!</span>
                  </div>

                  <h2 className="text-5xl font-black mb-6 leading-tight">
                    Start Your
                    <br />
                    <span className="text-yellow-300">Career</span>
                    <br />
                    Journey Today!
                  </h2>

                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    Create your free account and unlock access to thousands of job opportunities.
                  </p>

                  {/* Step Indicator */}
                  <div className="flex items-center space-x-4 mb-8">
                    <div className={`flex items-center space-x-2 ${step >= 1 ? "text-white" : "text-white/50"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-white text-orange-500" : "bg-white/20"}`}
                      >
                        {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
                      </div>
                      <span className="font-medium">Details</span>
                    </div>
                    <div className="w-8 h-0.5 bg-white/30"></div>
                    <div className={`flex items-center space-x-2 ${step >= 2 ? "text-white" : "text-white/50"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-white text-orange-500" : "bg-white/20"}`}
                      >
                        2
                      </div>
                      <span className="font-medium">Verify</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Free forever • No hidden fees</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Connect with top companies</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Get hired faster</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="lg:w-1/2 p-12">
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">
                      {step === 1 ? "Create Account" : "Verify Email"}
                    </h1>
                    <p className="text-gray-600 text-lg">
                      {step === 1 ? "Fill in your details to get started" : "Enter the OTP sent to your email"}
                    </p>
                  </div>

                  <form onSubmit={step === 1 ? sendOtpHandler : verifyAndRegisterHandler} className="space-y-6">
                    {step === 1 && (
                      <>
                        {/* Full Name */}
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold text-sm">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              type="text"
                              name="fullname"
                              value={input.fullname}
                              onChange={changeEventHandler}
                              placeholder="Enter your full name"
                              className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold text-sm">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              type="email"
                              name="email"
                              value={input.email}
                              onChange={changeEventHandler}
                              placeholder="Enter your email"
                              className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                            />
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold text-sm">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              type="text"
                              name="phoneNumber"
                              value={input.phoneNumber}
                              onChange={changeEventHandler}
                              placeholder="Enter 10-digit phone number"
                              className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                            />
                          </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold text-sm">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              type="password"
                              name="password"
                              value={input.password}
                              onChange={changeEventHandler}
                              placeholder="Create a strong password"
                              className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                            />
                          </div>
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-3">
                          <Label className="text-gray-700 font-semibold text-sm">I am a</Label>
                          <div className="flex gap-3">
                            {roles.map((roleOption) => (
                              <button
                                type="button"
                                key={roleOption}
                                onClick={() => setInput({ ...input, role: roleOption })}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold transition-all duration-300 ${
                                  input.role === roleOption
                                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-lg transform scale-105"
                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                                }`}
                              >
                                <User className="w-4 h-4" />
                                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Profile Picture */}
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold text-sm">Profile Picture </Label>
                          <div className="relative">
                            <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              accept="image/*"
                              type="file"
                              onChange={changeFileHandler}
                              className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        {/* OTP Input */}
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold text-sm">Enter OTP</Label>
                          <div className="relative">
                            <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              type="text"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="Enter 6-digit OTP"
                              className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400 text-center text-lg font-mono tracking-widest"
                              maxLength={6}
                            />
                          </div>
                          <p className="text-sm text-gray-500 text-center">
                            OTP sent to <span className="font-semibold text-orange-600">{input.email}</span>
                          </p>
                        </div>

                        {/* Back Button */}
                        <Button
                          type="button"
                          onClick={() => setStep(1)}
                          variant="outline"
                          className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl"
                        >
                          <ArrowLeft className="mr-2 h-5 w-5" />
                          Back to Details
                        </Button>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {step === 1 ? "Sending OTP..." : "Verifying..."}
                        </>
                      ) : (
                        <>
                          {step === 1 ? "Send OTP" : "Create Account"}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Divider - Only show on step 1 */}
                    {step === 1 && (
                      <>
                        <div className="relative my-8">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                          </div>
                        </div>

                        {/* Google Signup */}
                        <Button
                          type="button"
                          onClick={googleSignupHandler}
                          className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <SiGoogle className="w-5 h-5 mr-3 text-red-500" />
                          Continue with Google
                        </Button>
                      </>
                    )}
                  </form>

                  {/* Login Link */}
                  <div className="text-center mt-8">
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <Link to="/login" className="text-orange-600 hover:text-orange-700 font-bold transition-colors">
                        Sign In
                      </Link>
                    </p>
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

export default Signup
