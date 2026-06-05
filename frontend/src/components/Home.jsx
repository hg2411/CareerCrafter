"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx"
import Navbar from "./shared/Navbar.jsx"
import LatestJobs from "./LatestJobs.jsx"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, Users, Briefcase, Star, ArrowRight, CheckCircle2, Zap, Target, Sparkles } from "lucide-react"
import useGetStats from "@/hooks/useGetStats.jsx"
import Footer from "./Footer.jsx"
import careerIllustration from "@/assets/career-illustration.png"

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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-pink-50/40 to-purple-50/60 font-sans antialiased selection:bg-orange-500 selection:text-white flex flex-col overflow-x-hidden text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden py-16 lg:py-20">
        {/* Ambient Brand Backdrop Glow Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200/40 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700"></div>

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0 w-full">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-md border border-orange-200 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm self-center lg:self-start">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-orange-500" />
              #1 Job Platform in 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.12] tracking-tight">
              Land Your <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Dream Job
              </span>{" "}
              Today!
            </h1>

            <p className="text-sm sm:text-base font-medium text-gray-500 leading-relaxed max-w-md lg:max-w-none">
              Connect with 10,000+ top-tier companies, discover tailored opportunities, and design a workspace career you love.
            </p>

            {/* Action Search Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) navigate(`/jobs?search=${encodeURIComponent(query.trim())}`);
              }}
              className="w-full bg-white p-2 rounded-[20px] shadow-xl shadow-pink-500/5 border border-gray-100 flex items-center gap-2 transition-all focus-within:border-orange-400"
            >
              <div className="flex items-center flex-1 pl-3 gap-2.5">
                <Search className="text-gray-400 h-4 w-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Search titles, skills, or companies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full text-xs font-bold bg-transparent outline-none text-gray-800 placeholder-gray-400 py-2"
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-5 h-10 rounded-xl font-bold text-xs shadow-md shadow-pink-500/10 transition-all duration-200 active:scale-95 shrink-0"
              >
                Find Jobs
              </Button>
            </form>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-6 w-full flex items-center justify-center relative mt-8 lg:mt-0">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              {/* Soft backdrop ring frame behind the image */}
              <div className="absolute inset-0 rounded-[32px] border-2 border-dashed border-gray-200 pointer-events-none"></div>

              {/* Perfectly rounded image container */}
              <div className="absolute inset-4 bg-white/90 backdrop-blur-sm rounded-[24px] overflow-hidden shadow-xl border border-gray-100 flex items-center justify-center p-6 transition-all duration-500 hover:scale-[1.01]">
                <img
                  src={careerIllustration || "/placeholder.svg"}
                  alt="CareerCrafter Illustration"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

              {/* Floating Recruiter Engagement Widget */}
              <div className="absolute -bottom-2 -right-2 bg-white rounded-2xl shadow-xl p-3 border border-gray-100 max-w-[170px] animate-bounce-slow">
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-md flex items-center justify-center shadow-sm">
                      <Star className="h-2.5 w-2.5 text-white fill-current" />
                    </div>
                    <span className="text-[10px] font-black text-gray-800 tracking-tight">Top Recruiter Activity</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 overflow-hidden items-center">
                      <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Recruiter" />
                      <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Recruiter" />
                      <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" alt="Recruiter" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">
                      +12 companies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16 w-full relative z-10">
        {/* Fluid screen-sync layout container matching global padding layouts */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* Clean standalone card container matrix matched to project design tokens */}
          <div className="w-full bg-white/90 backdrop-blur-sm rounded-[24px] p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-xl shadow-pink-500/[0.02] transition-all duration-300">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-9 h-9 border-3 border-transparent border-t-orange-500 border-r-pink-500 rounded-full animate-spin"></div>
                <p className="text-gray-400 font-bold text-xs tracking-wide uppercase">
                  Loading positions...
                </p>
              </div>
            ) : (
              <LatestJobs jobs={allJobs?.slice(0, 6)} />
            )}
          </div>

          {/* Center-aligned action layout button matching search form dynamics */}
          <div className="mt-10">
            <Button
              onClick={() => navigate("/jobs")}
              className="bg-gray-900 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 text-white px-8 h-11 rounded-xl font-bold text-xs tracking-wide shadow-md shadow-gray-950/10 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 border border-transparent"
            >
              View All Jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

        </div>
      </section>



      {/* Stats Section */}
      <section className="py-20 w-full bg-white/60 backdrop-blur-md border-t border-gray-100 relative z-10">
        {/* Expanded maximum outer bounds container to allow full-width screen tracking matching layout headers */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Trusted by Thousands
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-400 mt-2">
              Join our growing community of job seekers and employers
            </p>
          </div>

          {/* Enlarged Grid Layout Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full">
            {[
              {
                count: `${allJobs?.length || 0}+`,
                label: "Active Jobs",
                icon: Briefcase,
                gradient: "from-orange-500 to-pink-500",
                bg: "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/10",
                iconColor: "text-orange-600",
              },
              {
                count: statsLoading ? "..." : `${stats.recruiters ?? 0}+`,
                label: "Companies",
                icon: Users,
                gradient: "from-pink-500 to-purple-600",
                bg: "bg-pink-500/5 hover:bg-pink-500/10 border-pink-500/10",
                iconColor: "text-pink-600",
              },
              {
                count: statsLoading ? "..." : `${stats.activeUsers ?? 0}+`,
                label: "Active Users",
                icon: Star,
                gradient: "from-purple-600 to-indigo-600",
                bg: "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10",
                iconColor: "text-purple-600",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`${stat.bg} rounded-[28px] p-8 sm:p-10 flex flex-col items-center justify-center text-center group hover:shadow-xl hover:border-transparent transition-all duration-300 border flex-1`}
              >
                {/* Scaled Up Container Avatar Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>

                {/* Increased Typography Sizing Weights for cleaner visibility across high-res displays */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-1.5 tracking-tight font-mono">
                  {stat.count}
                </h3>
                <p className="text-gray-400 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 w-full bg-white relative z-10">
        {/* Expanded outer boundary matching the global premium width */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-700 rounded-full px-3 py-1 mb-3 border border-purple-200/30">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-purple-500" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Vanguard Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Why We're Different ✨
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-400 mt-2">
              Everything you need to land your dream job
            </p>
          </div>

          {/* Expanded grid track container to span perfectly across large displays */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full">
            {[
              {
                title: "Verified Companies",
                text: "Every company is verified and trusted. No fake job postings, ever.",
                icon: CheckCircle2,
                iconColor: "text-emerald-600",
                bg: "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10",
              },
              {
                title: "Lightning Fast",
                text: "Apply to jobs in seconds. Our smart system does the heavy lifting.",
                icon: Zap,
                iconColor: "text-amber-500",
                bg: "bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/10",
              },
              {
                title: "Perfect Matches",
                text: "AI-powered matching finds jobs that fit your skills and goals.",
                icon: Target,
                iconColor: "text-blue-600",
                bg: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`${feature.bg} rounded-[28px] p-8 sm:p-10 flex flex-col items-center md:items-start text-center md:text-left group hover:shadow-xl hover:border-transparent transition-all duration-300 border flex-1`}
              >
                {/* Enhanced feature icon bracket */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl mb-4 border border-gray-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>

                {/* Scaled-up text structures for better viewport balancing */}
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

     {/* Guest/Non-User Call-To-Action Banner */}
      {!user && (
        <section className="py-20 bg-white relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-[32px] border-2 border-gray-100 bg-gradient-to-br from-orange-50/60 via-white to-pink-50/60 p-10 sm:p-14 shadow-2xl">
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                  Everything You Need To Build Your Career
                </h2>
                <p className="text-gray-500 text-sm font-semibold mt-3 max-w-xl mx-auto">
                  CareerCrafter brings jobs, recruiters, networking, and career growth together in one place.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                  { emoji: "💼", title: "Find Jobs", text: "Explore opportunities from top brands." },
                  { emoji: "🤝", title: "Connect", text: "Communicate directly via safe chat." },
                  { emoji: "📄", title: "Resumes", text: "Keep your workspace recruiter-ready." },
                  { emoji: "🎯", title: "Get Hired", text: "Apply smarter and track analytics." },
                ].map((item, key) => (
                  <div key={key} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="text-4xl mb-3">{item.emoji}</div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed font-medium">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
                <Button
                  onClick={() => navigate("/jobs")}
                  className="w-full sm:w-auto flex-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white h-12 rounded-xl font-bold text-sm shadow-lg shadow-pink-500/20 transition-all active:scale-95"
                >
                  Explore Jobs
                </Button>

                <Button
                  onClick={() => navigate("/signup")}
                  variant="outline"
                  className="w-full sm:w-auto flex-1 h-12 rounded-xl font-bold text-sm border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all active:scale-95"
                >
                  Create Free Account
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="mt-auto relative z-10">
        <Footer />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 4s ease-in-out infinite;
        }
      `}} />
    </div>
  )
}

export default Home