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
    window.location.href = `${USER_API_END_POINT}/auth/google`
  }

  const roles = ["student", "recruiter"]

  return (
    // Hard lock layout height to eliminate scrolling
    <div className="h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col overflow-hidden">
      <Navbar />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* Main card viewport frame */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pt-4 md:pt-6 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Hero Section */}
              <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-8 flex-col justify-center relative overflow-hidden rounded-l-[32px]">
                <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute bottom-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-sm"></div>

                <div className="relative z-10 max-w-md">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4 border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-xs font-medium">Join Our Community!</span>
                  </div>

                  <h2 className="text-3xl font-black mb-4 leading-tight">
                    Start Your<br />
                    <span className="text-yellow-300">Career</span><br />
                    Journey Today!
                  </h2>

                  <p className="text-sm text-white/90 mb-6 leading-relaxed">
                    Create your free account and unlock access to thousands of job opportunities.
                  </p>

                  {/* Step Indicator */}
                  <div className="flex items-center space-x-3 mb-6 text-xs">
                    <div className={`flex items-center space-x-1.5 ${step >= 1 ? "text-white" : "text-white/50"}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-white text-orange-500 font-bold" : "bg-white/20"}`}>
                        {step > 1 ? <CheckCircle className="w-4 h-4" /> : "1"}
                      </div>
                      <span className="font-medium">Details</span>
                    </div>
                    <div className="w-6 h-0.5 bg-white/30"></div>
                    <div className={`flex items-center space-x-1.5 ${step >= 2 ? "text-white" : "text-white/50"}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-white text-orange-500 font-bold" : "bg-white/20"}`}>
                        2
                      </div>
                      <span className="font-medium">Verify</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Free forever • No hidden fees</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Connect with top companies</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Get hired faster</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="w-full lg:w-1/2 p-6 sm:p-7 flex flex-col justify-center">
                <div className="w-full max-w-sm mx-auto">
                  <div className="text-center mb-3">
                    <h1 className="text-2xl font-black text-gray-900 mb-0.5">
                      {step === 1 ? "Create Account" : "Verify Email"}
                    </h1>
                    <p className="text-gray-400 text-xs">
                      {step === 1 ? "Fill in your details to get started" : "Enter the OTP sent to your email"}
                    </p>
                  </div>

                  <form onSubmit={step === 1 ? sendOtpHandler : verifyAndRegisterHandler} className="space-y-2.5">
                    {step === 1 && (
                      <>
                        {/* 2x2 Field Layout Grid to sharply collapse height */}
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                          {/* Full Name */}
                          <div className="space-y-0.5">
                            <Label className="text-gray-600 font-semibold text-[11px]">Full Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                              <Input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                placeholder="Full name"
                                className="pl-9 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="space-y-0.5">
                            <Label className="text-gray-600 font-semibold text-[11px]">Email Address</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                              <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="Email address"
                                className="pl-9 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400"
                              />
                            </div>
                          </div>

                          {/* Phone Number */}
                          <div className="space-y-0.5">
                            <Label className="text-gray-600 font-semibold text-[11px]">Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                              <Input
                                type="text"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                placeholder="10-digit phone"
                                className="pl-9 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400"
                              />
                            </div>
                          </div>

                          {/* Password */}
                          <div className="space-y-0.5">
                            <Label className="text-gray-600 font-semibold text-[11px]">Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                              <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Password"
                                className="pl-9 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-1">
                          <Label className="text-gray-600 font-semibold text-[11px]">I am a</Label>
                          <div className="flex gap-2">
                            {roles.map((roleOption) => (
                              <button
                                type="button"
                                key={roleOption}
                                onClick={() => setInput({ ...input, role: roleOption })}
                                className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border font-semibold text-[11px] transition-all duration-200 ${
                                  input.role === roleOption
                                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-sm"
                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-orange-50"
                                }`}
                              >
                                <User className="w-3 h-3" />
                                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Profile Picture */}
                        <div className="space-y-0.5">
                          <Label className="text-gray-600 font-semibold text-[11px]">Profile Picture</Label>
                          <div className="relative">
                            <Upload className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                            <Input
                              accept="image/*"
                              type="file"
                              onChange={changeFileHandler}
                              className="pl-10 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 file:mr-2 file:py-0.5 file:px-2 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        {/* OTP Input */}
                        <div className="space-y-1">
                          <Label className="text-gray-600 font-semibold text-[11px]">Enter OTP</Label>
                          <div className="relative">
                            <Shield className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                            <Input
                              type="text"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="Enter 6-digit OTP"
                              className="pl-10 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 text-center font-mono tracking-widest text-sm"
                              maxLength={6}
                            />
                          </div>
                          <p className="text-[10px] text-gray-400 text-center">
                            OTP sent to <span className="font-semibold text-orange-600">{input.email}</span>
                          </p>
                        </div>

                        {/* Back Button */}
                        <Button
                          type="button"
                          onClick={() => setStep(1)}
                          variant="outline"
                          className="w-full h-9 border border-gray-200 text-gray-600 font-semibold rounded-lg text-xs"
                        >
                          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                          Back to Details
                        </Button>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-9 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all duration-200"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                          {step === 1 ? "Sending OTP..." : "Verifying..."}
                        </>
                      ) : (
                        <>
                          {step === 1 ? "Send OTP" : "Create Account"}
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </>
                      )}
                    </Button>

                    {/* Divider - Only show on step 1 */}
                    {step === 1 && (
                      <>
                        <div className="relative my-1.5">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center text-[10px]">
                            <span className="px-2 bg-white text-gray-400 font-medium">Or continue with</span>
                          </div>
                        </div>

                        {/* Google Signup */}
                        <Button
                          type="button"
                          onClick={googleSignupHandler}
                          className="w-full h-9 bg-white hover:bg-gray-50 text-gray-600 font-semibold border border-gray-200 rounded-xl shadow-sm text-xs"
                        >
                          <SiGoogle className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                          Continue with Google
                        </Button>
                      </>
                    )}
                  </form>

                  {/* Login Link */}
                  <div className="text-center mt-3">
                    <p className="text-gray-400 text-[11px]">
                      Already have an account?{" "}
                      <Link to="/login" className="text-orange-600 hover:text-orange-700 font-bold">
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