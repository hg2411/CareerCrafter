"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx"
import Navbar from "./shared/Navbar.jsx"
import LatestJobs from "./LatestJobs.jsx"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, Users, Briefcase, Star, ArrowRight, CheckCircle2, Zap, Target } from "lucide-react"
import useGetStats from "@/hooks/useGetStats.jsx"

const Home = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  useGetAllJobs()
  const { user } = useSelector((store) => store.auth)
  const { allJobs, loading } = useSelector((store) => store.job)
  const { stats, loading: statsLoading } = useGetStats()

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies")
    }
  }, [user, navigate])

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="w-full bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-yellow-200 rounded-full opacity-70"></div>

        {/* Floating shapes */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-orange-400 rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-purple-400 rotate-45 animate-bounce delay-300"></div>

        <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center min-h-screen">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <TrendingUp className="w-4 h-4 mr-2" />
              #1 Job Platform in 2025
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-gray-900">Land Your</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Dream Job
              </span>
              <br />
              <span className="text-gray-900">Today!</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Connect with 10,000+ companies, discover amazing opportunities, and build the career you've always wanted.
            </p>

            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="flex items-center bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden max-w-lg">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Job title, company, or keyword..."
                  className="flex-grow px-6 py-4 text-gray-700 outline-none text-lg"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-4 rounded-none"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/jobs")}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Explore Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => navigate("/browse")}
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
              >
                Browse Categories
              </Button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="lg:w-1/2 relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main illustration placeholder */}
              <div className="w-80 h-80 bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500"></div>
              <div className="absolute inset-4 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Briefcase className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Your Future</h3>
                  <p className="text-gray-600">Starts Here</p>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-float">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2 text-sm font-medium">Job Match!</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-float delay-1000">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2 text-sm font-medium">Top Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">Join our growing community of job seekers and employers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                count: `${allJobs?.length || 0}+`,
                label: "Active Jobs",
                icon: Briefcase,
                gradient: "from-orange-400 to-pink-500",
                bg: "bg-orange-50",
              },
              {
                count: statsLoading ? "..." : `${stats.recruiters ?? 0}+`,
                label: "Companies",
                icon: Users,
                gradient: "from-pink-400 to-purple-500",
                bg: "bg-pink-50",
              },
              {
                count: statsLoading ? "..." : `${stats.activeUsers ?? 0}+`,
                label: "Active Users",
                icon: Star,
                gradient: "from-purple-400 to-indigo-500",
                bg: "bg-purple-50",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`${stat.bg} rounded-3xl p-8 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105`}
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}
                >
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-5xl font-black text-gray-900 mb-2">{stat.count}</h3>
                <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Hot Jobs Right Now 🔥</h2>
            <p className="text-xl text-gray-600">Fresh opportunities updated daily</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 text-lg">Finding amazing opportunities for you...</p>
              </div>
            ) : (
              <LatestJobs jobs={allJobs?.slice(0, 6)} />
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/jobs")}
              className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              View All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why We're Different ✨</h2>
            <p className="text-xl text-gray-600">Everything you need to land your dream job</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Companies",
                text: "Every company is verified and trusted. No fake job postings, ever.",
                icon: CheckCircle2,
                gradient: "from-green-400 to-emerald-500",
                bg: "bg-green-50",
              },
              {
                title: "Lightning Fast",
                text: "Apply to jobs in seconds. Our smart system does the heavy lifting.",
                icon: Zap,
                gradient: "from-yellow-400 to-orange-500",
                bg: "bg-yellow-50",
              },
              {
                title: "Perfect Matches",
                text: "AI-powered matching finds jobs that fit your skills and goals.",
                icon: Target,
                gradient: "from-blue-400 to-purple-500",
                bg: "bg-blue-50",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`${feature.bg} rounded-3xl p-8 group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Success Stories 🎉</h2>
            <p className="text-xl text-gray-600">Real people, real results</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Alex Johnson",
                role: "Software Engineer at Google",
                text: "Got my dream job in just 2 weeks! The platform is incredible and the support team is amazing.",
                img: "https://i.pravatar.cc/100?img=32",
                company: "Google",
              },
              {
                name: "Priya Sharma",
                role: "Product Manager at Meta",
                text: "As a recruiter, this is hands down the best platform I've used. Quality candidates every time!",
                img: "https://i.pravatar.cc/100?img=47",
                company: "Meta",
              },
              {
                name: "John Davis",
                role: "Designer at Spotify",
                text: "The user experience is phenomenal. Found multiple opportunities that were perfect for my skills.",
                img: "https://i.pravatar.cc/100?img=12",
                company: "Spotify",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.img || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-orange-200 shadow-lg object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 rounded-full">
                        {testimonial.company}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 text-lg leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/20 rotate-45"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/20 rounded-full"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl font-black mb-6">Ready to Change Your Life? 🚀</h2>
            <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join over 50,000 professionals who have transformed their careers with CareerCrafter. Your dream job is
              waiting for you!
            </p>
            <Button
              onClick={() => navigate("/signup")}
              className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Free Today
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <p className="mt-6 text-white/80">No credit card required • Free forever</p>
          </div>
        </section>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Home
