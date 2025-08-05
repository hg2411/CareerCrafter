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
        <div className="w-full max-w-5xl">
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
                    <span className="text-sm font-medium">Welcome Back!</span>
                  </div>

                  <h2 className="text-5xl font-black mb-6 leading-tight">
                    Ready to
                    <br />
                    <span className="text-yellow-300">Continue</span>
                    <br />
                    Your Journey?
                  </h2>

                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    Sign in to access thousands of job opportunities and connect with top employers.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Access to 10,000+ job listings</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Connect with verified recruiters</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      <span>Get personalized job recommendations</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Section */}
              <div className="lg:w-1/2 p-12">
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Sign In</h1>
                    <p className="text-gray-600 text-lg">Welcome back! Please enter your details.</p>
                  </div>

                  <form onSubmit={submitHandler} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-semibold text-sm">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="email"
                          value={input.email}
                          name="email"
                          onChange={changeEventHandler}
                          placeholder="Enter your email"
                          className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-semibold text-sm">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={input.password}
                          name="password"
                          onChange={changeEventHandler}
                          placeholder="Enter your password"
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

                    {/* Forgot Password */}
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Login Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Divider */}
                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                      </div>
                    </div>

                    {/* Google Login */}
                    <Button
                      type="button"
                      onClick={googleLoginHandler}
                      className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 font-semibold border-2 border-gray-200 hover:border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <SiGoogle className="w-5 h-5 mr-3 text-red-500" />
                      Continue with Google
                    </Button>
                  </form>

                  {/* Sign Up Link */}
                  <div className="text-center mt-8">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-bold transition-colors">
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
