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

  // Password strength checker
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
                    <span className="text-sm font-medium">Secure Reset</span>
                  </div>

                  <h2 className="text-5xl font-black mb-6 leading-tight">
                    Create Your
                    <br />
                    <span className="text-yellow-300">New</span>
                    <br />
                    Password 🔒
                  </h2>

                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    Choose a strong, unique password to keep your account secure and protected.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>At least 8 characters long</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Mix of letters, numbers & symbols</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Unique to this account</span>
                    </div>
                  </div>

                  {/* Illustration placeholder */}
                  <div className="mt-12 relative">
                    <div className="w-48 h-32 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                      <LockKeyhole className="w-16 h-16 text-white/60" />
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
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg mb-6">
                      <Key className="w-10 h-10 text-white" />
                    </div>

                    <h1 className="text-4xl font-black text-gray-900 mb-4">Reset Password</h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Create a strong new password for your account security.
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
                          placeholder="Enter your email"
                          className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* New Password Field */}
                    <div className="space-y-2">
                      <label className="text-gray-700 font-semibold text-sm">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Create new password"
                          className="pl-12 pr-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {/* Password Strength Indicator */}
                      {newPassword && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">Password Strength</span>
                            <span className={`text-xs font-semibold ${passwordStrength.color}`}>
                              {passwordStrength.text}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                passwordStrength.strength <= 1
                                  ? "bg-red-500"
                                  : passwordStrength.strength <= 2
                                    ? "bg-orange-500"
                                    : passwordStrength.strength <= 3
                                      ? "bg-yellow-500"
                                      : passwordStrength.strength <= 4
                                        ? "bg-blue-500"
                                        : "bg-green-500"
                              }`}
                              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                      <label className="text-gray-700 font-semibold text-sm">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className={`pl-12 pr-12 h-12 rounded-xl border-2 focus:ring-orange-400 text-gray-900 placeholder-gray-400 ${
                            confirmPassword
                              ? passwordsMatch
                                ? "border-green-400 focus:border-green-400"
                                : "border-red-400 focus:border-red-400"
                              : "border-gray-200 focus:border-orange-400"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {/* Password Match Indicator */}
                      {confirmPassword && (
                        <div className="flex items-center mt-2">
                          {passwordsMatch ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-sm text-green-600 font-medium">Passwords match</span>
                            </>
                          ) : (
                            <>
                              <div className="w-4 h-4 bg-red-500 rounded-full mr-2 flex items-center justify-center">
                                <span className="text-white text-xs">×</span>
                              </div>
                              <span className="text-sm text-red-600 font-medium">Passwords don't match</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading || !passwordsMatch || passwordStrength.strength < 3}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Resetting Password...
                        </>
                      ) : (
                        <>
                          Reset Password
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Security Tips */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Shield className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <h4 className="text-green-800 font-semibold text-sm mb-1">Security Tips</h4>
                          <ul className="text-green-600 text-sm space-y-1">
                            <li>• Use a unique password you haven't used before</li>
                            <li>• Include uppercase, lowercase, numbers, and symbols</li>
                            <li>• Avoid personal information like names or birthdays</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Back Button */}
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
