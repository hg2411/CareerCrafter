"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { USER_API_END_POINT } from "../utils/constant"
import Navbar from "../components/shared/Navbar"
import {
  Loader2,
  LockKeyhole,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  Sparkles,
  Key,
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const emailParam = new URLSearchParams(location.search).get("email") || ""
  const [email, setEmail] = useState(emailParam)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${USER_API_END_POINT}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Password reset successful. Please login.")
        navigate("/login")
      } else {
        toast.error(data.message || "Failed to reset password")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Try again!")
    } finally {
      setLoading(false)
    }
  }

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    const levels = [
      { strength: 0, text: "", color: "" },
      { strength: 1, text: "Very Weak", color: "text-red-500" },
      { strength: 2, text: "Weak", color: "text-orange-500" },
      { strength: 3, text: "Fair", color: "text-yellow-500" },
      { strength: 4, text: "Good", color: "text-blue-500" },
      { strength: 5, text: "Strong", color: "text-green-500" },
    ]

    return levels[strength]
  }

  const passwordStrength = getPasswordStrength(newPassword)
  const passwordsMatch = confirmPassword && newPassword === confirmPassword

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

      {/* MAIN CONTAINER: Shifted upwards with justify-start and tighter top padding */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pt-4 md:pt-8 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Hero Section */}
              <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-8 flex flex-col justify-center relative overflow-hidden rounded-l-[32px]">
                <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute bottom-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-sm"></div>

                {/* Content */}
                <div className="relative z-10 max-w-md">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4 border border-white/20">
                    <Shield className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-xs font-medium">Secure Reset</span>
                  </div>

                  <h2 className="text-3xl font-black mb-4 leading-tight">
                    Create Your<br />
                    <span className="text-yellow-300">New</span><br />
                    Password 🔒
                  </h2>

                  <p className="text-sm text-white/90 mb-6 leading-relaxed">
                    Choose a strong, unique password to keep your account secure and protected.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>At least 8 characters long</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Mix of letters, numbers & symbols</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Unique to this account</span>
                    </div>
                  </div>

                  {/* Compact Illustration block */}
                  <div className="mt-6 relative">
                    <div className="w-32 h-20 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
                      <LockKeyhole className="w-10 h-10 text-white/60" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              {/* Elongated inputs match with max-w-md container */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-md mb-3">
                      <Key className="w-7 h-7 text-white" />
                    </div>

                    <h1 className="text-2xl font-black text-gray-900 mb-0.5">Reset Password</h1>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Create a strong new password for your account security.
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
                          placeholder="Enter your email"
                          className="pl-10 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 w-full"
                        />
                      </div>
                    </div>

                    {/* New Password Field */}
                    <div className="space-y-0.5">
                      <label className="text-gray-600 font-semibold text-[11px]">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Create new password"
                          className="pl-10 pr-10 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {newPassword && (
                        <div className="pt-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] text-gray-400">Password Strength</span>
                            <span className={`text-[10px] font-semibold ${passwordStrength.color}`}>
                              {passwordStrength.text}
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full transition-all duration-300 ${
                                passwordStrength.strength <= 1 ? "bg-red-500" :
                                passwordStrength.strength <= 2 ? "bg-orange-500" :
                                passwordStrength.strength <= 3 ? "bg-yellow-500" :
                                passwordStrength.strength <= 4 ? "bg-blue-500" : "bg-green-500"
                              }`}
                              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-0.5">
                      <label className="text-gray-600 font-semibold text-[11px]">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className={`pl-10 pr-10 h-9 rounded-xl border text-xs text-gray-900 placeholder-gray-400 w-full ${
                            confirmPassword ? (passwordsMatch ? "border-green-400" : "border-red-400") : "border-gray-200"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Password Match Text */}
                      {confirmPassword && (
                        <div className="flex items-center pt-0.5">
                          <span className={`text-[10px] font-medium ${passwordsMatch ? "text-green-600" : "text-red-600"}`}>
                            {passwordsMatch ? "✓ Passwords match" : "× Passwords don't match"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading || !passwordsMatch || passwordStrength.strength < 3}
                      className="w-full h-9 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                          Resetting Password...
                        </>
                      ) : (
                        <>
                          Reset Password
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </>
                      )}
                    </Button>

                    {/* Integrated Tiny Security Alert Text Line */}
                    <p className="text-[10px] text-gray-400 text-center leading-normal pt-1 px-2">
                      Make sure your new password does not match any previous combinations.
                    </p>

                    {/* Back Button */}
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
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword  