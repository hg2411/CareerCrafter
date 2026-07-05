"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { API_BASE_URL } from "@/utils/constant"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/shared/Navbar.jsx"
import { Button } from "../components/ui/button.jsx"
import { Label } from "../components/ui/label.jsx"
import {
  Upload, FileText, Briefcase, Sparkles, X, History,
  Brain, ChevronRight, ArrowLeft, Code2, Users, BookOpen,
  CheckCircle2, AlertTriangle, ChevronDown, Target, Lightbulb,
  CheckSquare, Loader2, FileX, Plus, RotateCcw
} from "lucide-react"
import {
  setLoading, setLoadingMessage, setError,
  setReport, setReports, clearAIState
} from "../redux/aiSlice.js"

const AI_API_BASE = `${API_BASE_URL}/ai`

const LOADING_MESSAGES = [
  "Reading Resume...",
  "Analyzing Skills...",
  "Finding Skill Gaps...",
  "Generating Interview Questions...",
  "Creating Study Plan...",
]

const VIEW_FORM    = "form"
const VIEW_REPORT  = "report"
const VIEW_HISTORY = "history"

const getScoreMeta = (score) => {
  if (score >= 75) return { stroke: "#10b981", glow: "#10b98140", label: "Excellent Match", badge: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30", chipBg: "bg-emerald-50 text-emerald-600 border-emerald-100" }
  if (score >= 50) return { stroke: "#f59e0b", glow: "#f59e0b40", label: "Good Match",      badge: "bg-amber-500/20 text-amber-600 border-amber-500/30",   chipBg: "bg-amber-50 text-amber-600 border-amber-100" }
  return { stroke: "#ef4444", glow: "#ef444440", label: "Needs Work", badge: "bg-red-500/20 text-red-600 border-red-500/30", chipBg: "bg-red-50 text-red-600 border-red-100" }
}

const DAY_COLORS = [
  { card: "from-purple-500/5 to-purple-600/5 border-purple-100", badge: "text-purple-600 bg-purple-50 border-purple-100" },
  { card: "from-blue-500/5 to-blue-600/5 border-blue-100", badge: "text-blue-600 bg-blue-50 border-blue-100" },
  { card: "from-cyan-500/5 to-cyan-600/5 border-cyan-100", badge: "text-cyan-600 bg-cyan-50 border-cyan-100" },
  { card: "from-emerald-500/5 to-emerald-600/5 border-emerald-100", badge: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  { card: "from-amber-500/5 to-amber-600/5 border-amber-100", badge: "text-amber-600 bg-amber-50 border-amber-100" },
]

const ScoreCircle = ({ score = 0 }) => {
  const [anim, setAnim] = useState(0)
  const radius = 65
  const circ = 2 * Math.PI * radius
  const meta = getScoreMeta(score)

  useEffect(() => {
    const t = setTimeout(() => {
      let cur = 0
      const step = score / 45
      const iv = setInterval(() => {
        cur += step
        if (cur >= score) { setAnim(score); clearInterval(iv) }
        else setAnim(Math.floor(cur))
      }, 16)
      return () => clearInterval(iv)
    }, 200)
    return () => clearTimeout(t)
  }, [score])

  const offset = circ - (anim / 100) * circ
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="8" />
          <circle cx="70" cy="70" r={radius} fill="none" stroke={meta.stroke} strokeWidth="8"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.1s ease-out" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-gray-900 tracking-tight">{anim}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase">/ 100</span>
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full border text-[11px] font-bold ${meta.badge}`}>{meta.label}</div>
    </div>
  )
}

const AccordionItem = ({ idx, accentClass, question, intention, answer }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-gray-200 transition-all">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-4 text-left">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${accentClass}`}>{idx + 1}</span>
          <span className="text-gray-800 font-bold text-xs truncate">{question}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-gray-50/50 border-t border-gray-50">
            <div className="p-4 space-y-3">
              <p className="text-gray-900 font-semibold text-xs leading-relaxed">{question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl flex gap-2.5">
                  <Target className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-amber-800 text-[10px] font-black uppercase tracking-wider mb-0.5">What Interviewers Look For</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{intention}</p>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl flex gap-2.5">
                  <Lightbulb className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-0.5">Suggested Answer</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{answer}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AICoach = () => {
  const dispatch = useDispatch()
  const { loading, loadingMessage, error, report, reports } = useSelector((s) => s.ai)
  const [view, setView] = useState(VIEW_FORM)

  const [jobDescription, setJobDescription]   = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resumeFile, setResumeFile]           = useState(null)
  const [formError, setFormError]             = useState("")
  
  const fileInputRef = useRef(null)
  const msgIntervalRef = useRef(null)
  const msgIdxRef = useRef(0)

  const startLoadingMessages = () => {
    msgIdxRef.current = 0
    dispatch(setLoadingMessage(LOADING_MESSAGES[0]))
    msgIntervalRef.current = setInterval(() => {
      msgIdxRef.current = (msgIdxRef.current + 1) % LOADING_MESSAGES.length
      dispatch(setLoadingMessage(LOADING_MESSAGES[msgIdxRef.current]))
    }, 2000)
  }
  const stopLoadingMessages = () => clearInterval(msgIntervalRef.current)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") { setResumeFile(file); setFormError("") }
    else setFormError("Only PDF format resumes are supported.")
  }
  const handleRemoveFile = () => {
    setResumeFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async () => {
    setFormError("")
    dispatch(setError(null))
    if (!jobDescription.trim()) return setFormError("Job description parameter is required.")
    if (!resumeFile && !selfDescription.trim()) return setFormError("Please upload a resume PDF or supply a self-description snippet.")

    dispatch(setLoading(true))
    startLoadingMessages()
    try {
      const fd = new FormData()
      if (resumeFile) fd.append("resume", resumeFile)
      fd.append("selfDescription", selfDescription)
      fd.append("jobDescription", jobDescription)

      const res = await axios.post(`${AI_API_BASE}/analyze`, fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (res.data.success) {
        const rRes = await axios.get(`${AI_API_BASE}/report/${res.data.reportId}`, { withCredentials: true })
        if (rRes.data.success) {
          dispatch(setReport(rRes.data.report))
          setView(VIEW_REPORT)
        }
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Analysis failed. Please try again."))
    } finally {
      stopLoadingMessages()
      dispatch(setLoading(false))
    }
  }

  const loadHistory = async () => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    try {
      const res = await axios.get(`${AI_API_BASE}/reports`, { withCredentials: true })
      if (res.data.success) dispatch(setReports(res.data.reports))
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Failed to load history."))
    } finally {
      dispatch(setLoading(false))
    }
    setView(VIEW_HISTORY)
  }

  const openReport = async (id) => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    try {
      const res = await axios.get(`${AI_API_BASE}/report/${id}`, { withCredentials: true })
      if (res.data.success) { dispatch(setReport(res.data.report)); setView(VIEW_REPORT) }
    } catch (err) {
      dispatch(setError("Failed to load report."))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const resetToForm = () => {
    dispatch(clearAIState())
    setJobDescription("")
    setSelfDescription("")
    setResumeFile(null)
    setFormError("")
    setView(VIEW_FORM)
  }

  return (
    <div className="h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col overflow-hidden">
      <Navbar />

      {/* Decorative background matrices */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse"></div>
      </div>



      {/* DYNAMIC SCROLLABLE CENTRAL CONTENT BOARD FRAME */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-4 flex flex-col overflow-hidden relative z-10">
        <AnimatePresence mode="wait">

          {/* ════════ FORM VIEW PANEL ════════ */}
          {view === VIEW_FORM && (
            <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex-1 flex flex-col overflow-hidden space-y-4">
              
              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mb-1 shrink-0 w-full max-w-4xl mx-auto px-1">
                <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/10 rounded-full text-orange-700 text-[10px] font-black uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                    <span>Powered by Gemini AI</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-1">AI Career Coach</h2>
                </div>
                <Button onClick={loadHistory} variant="outline" className="h-9 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 shadow-sm flex items-center gap-1.5 bg-white hover:bg-gray-50 shrink-0">
                  <History className="w-3.5 h-3.5 text-gray-400" /> View History
                </Button>
              </div>

              {/* Central Glass Card Workspace Structure */}
              <div className="flex-1 bg-white border border-gray-100 rounded-[28px] shadow-2xl p-5 overflow-y-auto space-y-4 max-w-4xl w-full mx-auto">
                
                {/* Internal Notification Banner Hooks */}
                <AnimatePresence>
                  {(formError || error) && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{formError || error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Job Description Textbox Input Block */}
                <div className="space-y-1 bg-gray-50/60 border border-gray-100 p-3 rounded-2xl focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm transition-all duration-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <Label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-gray-400" /> Job Description
                    </Label>
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded">Required</span>
                  </div>
                  <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description or requirements here..."
                    className="w-full bg-transparent h-20 text-xs font-semibold text-gray-900 placeholder-gray-400 border-0 outline-none resize-none focus:ring-0" />
                </div>

                {/* Side-by-Side Lower Input Configuration Grid Cluster */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload Attachment Node */}
                  <div className="bg-gray-50/60 border border-gray-100 p-4 rounded-2xl flex flex-col justify-center border-dashed border-2 border-gray-200 hover:border-orange-400/50 transition-colors">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-7 h-7 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0"><Upload className="w-4 h-4 text-orange-600" /></div>
                      <div>
                        <h4 className="text-gray-800 font-black text-xs">Upload Resume (PDF)</h4>
                        <p className="text-gray-400 text-[10px]">Only PDF files, maximum size 5MB</p>
                      </div>
                    </div>
                    {!resumeFile ? (
                      <div onClick={() => fileInputRef.current?.click()} className="flex-1 bg-white border border-gray-100 rounded-xl py-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/50 transition-colors shadow-sm group">
                        <Upload className="w-4 h-4 text-gray-400 mb-1 group-hover:text-orange-500" />
                        <span className="text-[11px] font-bold text-gray-600">Choose File</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-100 rounded-xl shadow-sm">
                        <FileText className="w-4 h-4 text-orange-600 shrink-0" />
                        <span className="text-xs font-bold text-orange-800 truncate flex-1">{resumeFile.name}</span>
                        <button onClick={handleRemoveFile} className="text-gray-400 hover:text-red-500 transition-colors shrink-0"><X className="w-4 h-4" /></button>
                      </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                  </div>

                  {/* Personal Bio/Self Description block */}
                  <div className="space-y-1 bg-gray-50/60 border border-gray-100 p-3 rounded-2xl focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm transition-all duration-200">
                    <Label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <FileText className="w-3.5 h-3.5 text-gray-400" /> About Yourself (Optional)
                    </Label>
                    <textarea value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)}
                      placeholder="Briefly write about your experience, skills, and projects..."
                      className="w-full bg-transparent h-20 text-xs font-semibold text-gray-900 placeholder-gray-400 border-0 outline-none resize-none focus:ring-0" />
                  </div>
                </div>

                {/* Processing Button row execution node */}
                <div className="pt-2 border-t border-gray-50 flex flex-col items-center gap-3">
                  <Button onClick={handleSubmit} disabled={loading}
                    className="w-full max-w-sm h-11 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md shadow-pink-500/10 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    {loading ? "Analyzing..." : "Compare Resume with Job"}
                  </Button>

                  {/* Operational loader tickers container line */}
                  <AnimatePresence>
                    {loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-xl shadow-sm">
                          <Loader2 className="w-3.5 h-3.5 text-orange-500 animate-spin" />
                          <motion.span key={loadingMessage} initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}>{loadingMessage}</motion.span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}

          {/* ════════ REPORT VIEW PANEL ════════ */}
          {view === VIEW_REPORT && report && (
            <motion.div key="report" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex-1 flex flex-col overflow-hidden space-y-4">
              {/* Report Actions / Navigation Row */}
              <div className="flex items-center justify-between shrink-0 mb-1">
                <Button onClick={() => setView(VIEW_FORM)} variant="outline" className="h-9 border border-gray-200 px-3 rounded-xl text-gray-600 font-bold text-xs shadow-sm group bg-white hover:bg-gray-50">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1 transition-transform group-hover:-translate-x-0.5" /> Back to Coach
                </Button>
                <div className="flex gap-2">
                  <Button onClick={resetToForm} className="h-9 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-sm flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> New Analysis
                  </Button>
                  <Button onClick={loadHistory} variant="outline" className="h-9 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 shadow-sm flex items-center gap-1.5 bg-white hover:bg-gray-50">
                    <History className="w-3.5 h-3.5 text-gray-400" /> View History
                  </Button>
                </div>
              </div>

              <div className="flex-1 bg-white border border-gray-100 rounded-[28px] shadow-2xl p-5 overflow-y-auto space-y-6">
                
                {/* Match Overview Header Row Cluster */}
                <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <ScoreCircle score={report.matchScore} />
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-black text-gray-900 tracking-tight">Analysis Complete</h3>
                      <p className="text-gray-400 text-xs font-medium max-w-md line-clamp-2 mt-1 leading-normal">
                        <b>Job Description: </b>{report.jobDescription}
                      </p>
                    </div>
                  </div>

                  {/* Quantitative Metric badging panels */}
                  <div className="flex gap-2 text-center shrink-0">
                    <div className="bg-white border border-gray-100 p-2.5 rounded-xl shadow-sm min-w-20">
                      <p className="text-[10px] font-black text-gray-400 uppercase">Missing Skills</p>
                      <p className="text-sm font-black text-red-500 mt-0.5">{report.missingSkills?.length ?? 0}</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-2.5 rounded-xl shadow-sm min-w-20">
                      <p className="text-[10px] font-black text-gray-400 uppercase">Questions</p>
                      <p className="text-sm font-black text-purple-600 mt-0.5">{(report.technicalQuestions?.length ?? 0) + (report.behavioralQuestions?.length ?? 0)}</p>
                    </div>
                  </div>
                </div>

                {/* Skill Gaps + Suggestions Side-By-Side Grid matrix rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Missing Skills card */}
                  <div className="border border-gray-100 p-4 rounded-2xl bg-white shadow-sm space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Missing Skills</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {report.missingSkills?.length > 0 ? (
                        report.missingSkills.map((skill, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-red-700 bg-red-50 border border-red-100">{skill}</span>
                        ))
                      ) : (
                        <p className="text-gray-400 text-xs font-medium">No missing skills identified. Perfect match!</p>
                      )}
                    </div>
                  </div>

                  {/* Resume Suggestions line */}
                  <div className="border border-gray-100 p-4 rounded-2xl bg-white shadow-sm space-y-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Resume Suggestions</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {report.resumeSuggestions?.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technical interview catalog accordion mapping panels */}
                {report.technicalQuestions?.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider px-1">Technical Interview Questions</h4>
                    <div className="space-y-2">
                      {report.technicalQuestions.map((item, i) => (
                        <AccordionItem key={i} idx={i} accentClass="bg-purple-50 border-purple-100 text-purple-600" question={item.question} intention={item.intention} answer={item.answer} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Behavioral interview catalog panels */}
                {report.behavioralQuestions?.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider px-1">Behavioral Interview Questions (STAR)</h4>
                    <div className="space-y-2">
                      {report.behavioralQuestions.map((item, i) => (
                        <AccordionItem key={i} idx={i} accentClass="bg-cyan-50 border-cyan-100 text-cyan-600" question={item.question} intention={item.intention} answer={item.answer} />
                      ))}
                    </div>
                  </div>
                )}

                {/* 7-Day Curriculum Study Roadmap display cards */}
                {report.studyPlan?.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider px-1">7-Day Study Plan</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {report.studyPlan.map((day, i) => {
                        const dc = DAY_COLORS[i % DAY_COLORS.length]
                        return (
                          <div key={i} className={`rounded-2xl border p-4 bg-gradient-to-br ${dc.card} shadow-sm space-y-2.5`}>
                            <span className={`inline-block px-2 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-wider ${dc.badge}`}>Day {day.day}</span>
                            <h4 className="text-gray-900 font-black text-xs leading-snug">{day.focus}</h4>
                            <ul className="space-y-1.5 border-t border-gray-100/50 pt-2">
                              {(day.tasks || []).map((task, ti) => (
                                <li key={ti} className="flex items-start gap-1.5 text-[11px] text-gray-600 font-semibold leading-normal">
                                  <CheckSquare className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}

          {/* ════════ HISTORY LEDGER VIEW PANEL ════════ */}
          {view === VIEW_HISTORY && (
            <motion.div key="history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex-1 flex flex-col overflow-hidden space-y-4">
              {/* History Navigation Row */}
              <div className="flex items-center justify-between shrink-0 mb-1">
                <Button onClick={() => setView(VIEW_FORM)} variant="outline" className="h-9 border border-gray-200 px-3 rounded-xl text-gray-600 font-bold text-xs shadow-sm group bg-white hover:bg-gray-50">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1 transition-transform group-hover:-translate-x-0.5" /> Back to Coach
                </Button>
                <Button onClick={resetToForm} className="h-9 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-sm flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> New Analysis
                </Button>
              </div>

              <div className="flex-1 bg-white border border-gray-100 rounded-[28px] shadow-2xl p-5 overflow-y-auto space-y-3">
                
                {loading && (
                  <div className="h-full flex flex-col items-center justify-center gap-2 py-20">
                    <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                    <p className="text-gray-400 text-xs font-bold">Loading history...</p>
                  </div>
                )}

                {error && !loading && (
                  <div className="text-center py-20">
                    <p className="text-red-500 font-bold text-sm">Failed to load history</p>
                    <p className="text-gray-400 text-xs mt-0.5">{error}</p>
                  </div>
                )}

                {!loading && !error && reports.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 max-w-xs mx-auto space-y-3">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 shadow-inner">
                      <FileX className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-gray-800">No History Found</h3>
                      <p className="text-gray-400 text-xs mt-0.5">Run your first matching analysis to see your history here.</p>
                    </div>
                    <Button onClick={resetToForm} className="h-9 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500">Run First Analysis</Button>
                  </div>
                )}

                {!loading && !error && reports.length > 0 && (
                  <div className="space-y-2.5 max-w-3xl w-full mx-auto">
                    <p className="text-gray-400 text-xs font-bold px-1 uppercase tracking-wider">{reports.length} Saved Reports</p>
                    
                    {reports.map((r, idx) => {
                      const meta = getScoreMeta(r.matchScore)
                      const date = new Date(r.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
                      const shortJob = r.jobDescription?.length > 100 ? r.jobDescription.slice(0, 100) + "..." : r.jobDescription
                      return (
                        <motion.button key={r._id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} onClick={() => openReport(r._id)}
                          className="w-full text-left bg-white border border-gray-100 hover:border-orange-200 p-4 rounded-2xl flex items-center gap-4 transition-all hover:shadow-lg shadow-sm group"
                        >
                          <div className={`w-14 h-14 rounded-xl border ${meta.chipBg} shrink-0 flex flex-col items-center justify-center shadow-inner`}>
                            <span className="text-xl font-black leading-none">{r.matchScore}</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">Score</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${meta.chipBg}`}>{meta.label}</span>
                              <span className="text-gray-400 text-[10px] font-bold">{date}</span>
                            </div>
                            <p className="text-gray-600 font-semibold text-xs truncate group-hover:text-orange-600 transition-colors">{shortJob}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors shrink-0" />
                        </motion.button>
                      )
                    })}
                  </div>
                )}

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

export default AICoach