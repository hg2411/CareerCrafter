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
                    <Shield className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Secure Recovery</span>
                  </div>

                  <h2 className="text-5xl font-black mb-6 leading-tight">
                    Forgot Your
                    <br />
                    <span className="text-yellow-300">Password?</span>
                    <br />
                    No Worries! 🔐
                  </h2>

                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    It happens to the best of us! Let's get you back into your account quickly and securely.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Secure OTP verification</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Quick password reset</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Account security maintained</span>
                    </div>
                  </div>

                  {/* Illustration placeholder */}
                  <div className="mt-12 relative">
                    <div className="w-48 h-32 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                      <Lock className="w-16 h-16 text-white/60" />
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
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg mb-6">
                      <Mail className="w-10 h-10 text-white" />
                    </div>

                    <h1 className="text-4xl font-black text-gray-900 mb-4">Reset Password</h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Enter your registered email address and we'll send you a secure OTP to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-gray-700 font-semibold text-sm">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your registered email"
                          className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send Reset OTP
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Help Text */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <div>
                          <h4 className="text-blue-800 font-semibold text-sm mb-1">Check your email</h4>
                          <p className="text-blue-600 text-sm leading-relaxed">
                            The OTP will be sent to your registered email address. Don't forget to check your spam
                            folder if you don't see it in your inbox.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Back to Login */}
                    <Button
                      type="button"
                      onClick={() => navigate("/login")}
                      variant="outline"
                      className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back to Login
                    </Button>
                  </form>

                  {/* Additional Help */}
                  <div className="text-center mt-8 p-6 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-2">Still having trouble?</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      If you're not receiving the OTP or facing other issues, our support team is here to help.
                    </p>
                    <Button
                      variant="ghost"
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-semibold"
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
