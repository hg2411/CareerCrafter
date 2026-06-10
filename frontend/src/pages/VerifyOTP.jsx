"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { USER_API_END_POINT } from "../utils/constant"
import Navbar from "../components/shared/Navbar"
import { Loader2, ShieldCheck, Mail, ArrowRight, ArrowLeft, Clock, Sparkles, Key } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

const VerifyOTP = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const emailParam = new URLSearchParams(location.search).get("email") || ""
  const [email, setEmail] = useState(emailParam)
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !otp) {
      toast.error("Please enter all fields.")
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${USER_API_END_POINT}/verify-forgot-password-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("OTP verified! Reset your password.")
        navigate(`/reset-password?email=${encodeURIComponent(email)}`)
      } else {
        toast.error(data.message || "Invalid OTP")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Try again!")
    } finally {
      setLoading(false)
    }
  }

  return (
    // Hard lock layout to viewport height and disable scrolling
    <div className="h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col overflow-hidden">
      <Navbar />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* MAIN CONTAINER: Shifted upwards with justify-start and proper step layout constraints */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pt-4 md:pt-8 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Hero Section */}
              <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-8 flex flex-col justify-center relative overflow-hidden rounded-l-[32px]">
                {/* Background Decorations */}
                <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute bottom-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-sm"></div>

                {/* Content */}
                <div className="relative z-10 max-w-md">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4 border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-xs font-medium">Secure Verification</span>
                  </div>

                  <h2 className="text-3xl font-black mb-4 leading-tight">
                    Almost<br />
                    <span className="text-yellow-300">There!</span><br />
                    Verify OTP 🔐
                  </h2>

                  <p className="text-sm text-white/90 mb-6 leading-relaxed">
                    We've sent a secure code to your email. Enter it below to verify your identity and proceed.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>6-digit secure code</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Valid for 10 minutes</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Check spam folder if needed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              {/* Reset to max-w-md to match the wide style parameters of Signup page */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="text-center mb-4">
                    {/* Balanced Icon Block */}
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-md mb-3">
                      <ShieldCheck className="w-7 h-7 text-white" />
                    </div>

                    <h1 className="text-2xl font-black text-gray-900 mb-0.5">Verify OTP</h1>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Enter the 6-digit code we sent to your email address to continue.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-0.5">
                      <label className="text-gray-600 font-semibold text-[11px]">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 w-full"
                        />
                      </div>
                    </div>

                    {/* OTP Field */}
                    <div className="space-y-0.5">
                      <label className="text-gray-600 font-semibold text-[11px]">Verification Code</label>
                      <div className="relative">
                        <Key className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <Input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          className="pl-10 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 text-center font-mono tracking-widest text-sm w-full"
                          maxLength={6}
                        />
                      </div>
                      
                      {/* Integrated text block for inline notifications instead of tall alert boxes */}
                      <div className="flex items-center justify-between pt-1.5 text-[11px] text-gray-400">
                        <span>Sent to: <span className="font-semibold text-orange-600">{email || "your email"}</span></span>
                        <button 
                          type="button" 
                          className="text-orange-600 hover:text-orange-700 font-bold transition-colors cursor-pointer bg-transparent border-0 p-0"
                        >
                          Resend Code
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-9 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all duration-200"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & Continue
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </>
                      )}
                    </Button>

                    {/* Back Button */}
                    <Button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      variant="outline"
                      className="w-full h-9 border border-gray-200 text-gray-600 font-semibold rounded-xl text-xs transition-all duration-200"
                    >
                      <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                      Back to Forgot Password
                    </Button>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP