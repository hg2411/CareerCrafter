"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUser } from "../../redux/authSlice"
import { Loader2, Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react"
import Navbar from "../shared/Navbar"
import { USER_API_END_POINT } from "../../utils/constant"
import { SiGoogle } from "react-icons/si"

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const { loading, user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)

  const submitHandler = async (e) => {
    e.preventDefault()
    const { email, password, role } = input

    if (!email || !password || !role) {
      toast.error("Please fill in all fields.")
      return
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.")
      return
    }

    try {
      dispatch(setLoading(true))
      const res = await fetch(`${USER_API_END_POINT}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(input),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`HTTP error! status: ${res.status}, message: ${text}`)
      }

      const data = await res.json()
      if (data.success) {
        dispatch(setUser(data.user))
        toast.success(data.message)
        navigate("/")
      } else {
        toast.error(data.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error.message || "Something went wrong during login")
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user && window.location.pathname === "/login") {
      navigate("/", { replace: true })
    }
  }, [])

  const googleLoginHandler = () => {
    window.location.href = "http://localhost:8000/api/v1/user/auth/google"
  }

  const roles = ["student", "recruiter"]

  return (
    // Hard lock layout to viewport height and disable scrolling
    <div className="h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col overflow-hidden">
      <Navbar />

      {/* Decorative Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* MAIN CONTAINER: Changed from items-center/justify-center to justify-start with fine-tuned top padding */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pt-4 md:pt-8 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">

              {/* Left Hero Section */}
              <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white p-8 flex-col justify-center relative overflow-hidden rounded-l-[32px]">
                {/* Background Decorations */}
                <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute bottom-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-sm"></div>

                {/* Content */}
                <div className="relative z-10 max-w-md">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4 border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-xs font-medium">Welcome Back!</span>
                  </div>

                  <h2 className="text-3xl font-black mb-4 leading-tight">
                    Ready to<br />
                    <span className="text-yellow-300">Continue</span><br />
                    Your Journey?
                  </h2>

                  <p className="text-sm text-white/90 mb-6 leading-relaxed">
                    Sign in to access thousands of job opportunities, connect with top recruiters, and take the next step in your career.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Access 10,000+ active job opportunities</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>Connect with verified recruiters</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2.5"></div>
                      <span>AI-powered recommendations</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-full max-w-xs mx-auto">
                  <div className="text-center mb-4">
                    <h1 className="text-2xl font-black text-gray-900 mb-0.5">Sign In</h1>
                    <p className="text-gray-400 text-xs">Welcome back! Please enter your details.</p>
                  </div>

                  <form onSubmit={submitHandler} className="space-y-3">
                    {/* Email Field */}
                    <div className="space-y-0.5">
                      <Label className="text-gray-600 font-semibold text-[11px]">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <Input
                          type="email"
                          value={input.email}
                          name="email"
                          onChange={changeEventHandler}
                          placeholder="Enter your email"
                          className="pl-10 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-0.5">
                      <Label className="text-gray-600 font-semibold text-[11px]">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={input.password}
                          name="password"
                          onChange={changeEventHandler}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 h-9 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
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

                    {/* Forgot Password */}
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="text-orange-600 hover:text-orange-700 font-semibold text-[11px]"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Login Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-9 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all duration-200"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </>
                      )}
                    </Button>

                    {/* Divider */}
                    <div className="relative my-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-[10px]">
                        <span className="px-2 bg-white text-gray-400 font-medium">Or continue with</span>
                      </div>
                    </div>

                    {/* Google Login */}
                    <Button
                      type="button"
                      onClick={googleLoginHandler}
                      className="w-full h-9 bg-white hover:bg-gray-50 text-gray-600 font-semibold border border-gray-200 rounded-xl shadow-sm text-xs"
                    >
                      <SiGoogle className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                      Continue with Google
                    </Button>
                  </form>

                  {/* Sign Up Link */}
                  <div className="text-center mt-4">
                    <p className="text-gray-400 text-[11px]">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-bold">
                        Sign Up Free
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

export default Login