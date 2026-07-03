"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { USER_API_END_POINT } from "../utils/constant"
import { Loader2, Mail, ArrowRight, ArrowLeft, Shield, Sparkles, Lock } from "lucide-react"
import Navbar from "../components/shared/Navbar"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter your email.")
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${USER_API_END_POINT}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("OTP sent to your email!")
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`)
      } else {
        toast.error(data.message || "Failed to send OTP")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
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

      {/* MAIN CONTAINER: Shifted upwards with justify-start and tighter pt spacing */}
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
                    <Shield className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-xs font-medium">Secure Recovery</span>
                  </div>

                  <h2 className="text-3xl font-black mb-4 leading-tight">
                    Forgot Your<br />
                    <span className="text-yellow-300">Password?</span><br />
                    No Worries! 🔐
                  </h2>

                  <p className="text-sm text-white/90 mb-6 leading-relaxed">
                    It happens to the best of us! Let's get you back into your account quickly and securely.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Secure OTP verification</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Quick password reset</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Account security maintained</span>
                    </div>
                  </div>

                  {/* Compact Illustration block */}
                  <div className="mt-6 relative">
                    <div className="w-32 h-20 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
                      <Lock className="w-10 h-10 text-white/60" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-full max-w-xs mx-auto">
                  <div className="text-center mb-4">
                    {/* Compact Icon */}
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-md mb-3">
                      <Mail className="w-7 h-7 text-white" />
                    </div>

                    <h1 className="text-2xl font-black text-gray-900 mb-0.5">Reset Password</h1>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Enter your registered email address for a secure recovery OTP.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Email Field */}
                    <div className="space-y-0.5">
                      <label className="text-gray-600 font-semibold text-[11px]">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your registered email"
                          className="pl-10 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400"
                        />
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
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send Reset OTP
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </>
                      )}
                    </Button>

                    {/* Compact Info Notification Box */}
                    <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3">
                      <div className="flex items-start space-x-2.5">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-[10px] font-bold">!</span>
                        </div>
                        <div>
                          <h4 className="text-blue-800 font-semibold text-[11px] mb-0.5">Check your email</h4>
                          <p className="text-blue-600 text-[10px] leading-normal">
                            Please review your inbox and spam directory if the security code does not show within a few minutes.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Back to Login Button */}
                    <Button
                      type="button"
                      onClick={() => navigate("/login")}
                      variant="outline"
                      className="w-full h-9 border border-gray-200 text-gray-600 font-semibold rounded-xl text-xs transition-all duration-200"
                    >
                      <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                      Back to Login
                    </Button>
                  </form>

                  {/* Compact Help Box Footer */}
                  <div className="text-center mt-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                    <p className="text-gray-500 text-[10px] mb-1">
                      Still having trouble getting back in?
                    </p>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 text-orange-600 hover:text-orange-700 font-bold text-[11px] hover:bg-transparent"
                    >
                      Contact Support
                    </Button>
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

export default ForgotPassword