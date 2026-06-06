"use client"

import { useEffect, useState } from "react"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import {
  ArrowLeft,
  Loader2,
  Building,
  Globe,
  MapPin,
  FileText,
  Upload,
  Sparkles,
  CheckCircle,
  Star,
  Target,
  Users,
} from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import useGetCompanyById from "@/hooks/useGetCompanyById"

const CompanySetup = () => {
  const params = useParams()
  useGetCompanyById(params.id)
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  })
  const { singleCompany } = useSelector((store) => store.company)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!input.name.trim()) {
      toast.error("Company name is required")
      return
    }
    const formData = new FormData()
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/companies")
      }
    } catch (error) {
      console.error("Update failed:", error)
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    })
  }, [singleCompany])

  const getCompletionPercentage = () => {
    const fields = [input.name, input.description, input.website, input.location]
    const filledFields = fields.filter((field) => field && field.trim()).length
    return Math.round((filledFields / fields.length) * 100)
  }

  const completionPercentage = getCompletionPercentage()

  return (
    // STRICT VIEWPORT LOCK: Enforces max height boundaries and locks the browser scroll tracks
    <div className="h-screen max-h-screen bg-[#FDFBF9] flex flex-col overflow-hidden">
      <Navbar />

      {/* Decorative background vectors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* FIXED DASHBOARD HEADER ACTIONS PANEL BLOCK */}
      <div className="bg-white border-b border-gray-100 py-3 relative z-10 shrink-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold px-4 h-9.5 rounded-xl border border-gray-200 shadow-sm group transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                Company Profile Setup
              </h1>
              <p className="text-gray-400 text-[11px] font-semibold mt-0.5">
                Configure corporate positioning variables, brand graphics, and directory metadata.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 border border-pink-500/10 rounded-full px-3 py-1 text-pink-700 text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-orange-500" />
            <span>Wizard Active</span>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT SPLIT CONTAINER FRAMEWORK */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-4 flex gap-6 overflow-hidden relative z-10">
        
        {/* LEFT COLUMN PANEL: Expansive Input Fields Grid Layer */}
        <div className="flex-1 bg-white border border-gray-100 rounded-[28px] shadow-xl overflow-hidden flex flex-col">
          {/* Card Top Branding Banner Accent Strip */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white px-6 py-4 relative overflow-hidden shrink-0">
            <div className="absolute top-2 right-4 w-20 h-20 bg-white/10 rounded-full blur-md"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                <Building className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-base font-black tracking-tight">Setup Corporate Parameters</h2>
                <p className="text-white/80 text-[11px]">Verify structural records and brand identity assets</p>
              </div>
            </div>
          </div>

          {/* Core Input Form Block Wrapper */}
          <div className="p-5 flex-1 overflow-y-auto">
            <form onSubmit={submitHandler} id="companySetupForm" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="space-y-1.5">
                  <Label className="text-gray-700 font-bold text-xs flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-gray-400" />
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    placeholder="e.g. OpenAI, Google, Microsoft"
                    className="h-9.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 bg-white focus:border-orange-400 focus:ring-orange-400 shadow-sm transition-all"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <Label className="text-gray-700 font-bold text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    HQ Location Matrix
                  </Label>
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="e.g. San Francisco, Remote"
                    className="h-9.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 bg-white focus:border-orange-400 focus:ring-orange-400 shadow-sm transition-all"
                  />
                </div>

                {/* Website */}
                <div className="space-y-1.5">
                  <Label className="text-gray-700 font-bold text-xs flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-gray-400" />
                    Corporate Domain Address
                  </Label>
                  <Input
                    type="text"
                    name="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    placeholder="e.g. https://openai.com"
                    className="h-9.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 bg-white focus:border-orange-400 focus:ring-orange-400 shadow-sm transition-all"
                  />
                </div>

                {/* Company Logo Upload Layer */}
                <div className="space-y-1.5 relative">
                  <Label className="text-gray-700 font-bold text-xs flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-gray-400" />
                    Brand Identity Graphics
                  </Label>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="h-9.5 rounded-xl border border-gray-200 text-xs text-gray-500 bg-white file:mr-3 file:py-0.5 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer pt-1.5 shadow-sm"
                    />
                    {input.file && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-md">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        <span>Loaded</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Full-Width Core Description Block */}
              <div className="space-y-1.5">
                <Label className="text-gray-700 font-bold text-xs flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  Company Summary Bio
                </Label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Describe what your organization targets and what precise operational variables make your office culture unique..."
                  className="w-full h-16 max-h-16 min-h-16 p-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 placeholder-gray-400 bg-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none shadow-sm transition-all resize-none"
                />
              </div>
            </form>
          </div>

          {/* Form Save Action execution bottom bar strip */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-end shrink-0 bg-gray-50/50">
            <Button
              type="submit"
              form="companySetupForm"
              disabled={loading}
              className="w-full md:w-auto min-w-[240px] h-9.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-black text-xs rounded-xl shadow-md shadow-pink-500/10 transition-all hover:shadow-lg transform active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Updating Corporate Identity Files...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                  Save & Update Company Profile
                </>
              )}
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN PANEL: Sticky Real-time Progress & Tips Sidecar widget */}
        <div className="hidden lg:flex flex-col w-72 bg-white border border-gray-100 rounded-[28px] p-4 shadow-sm h-fit space-y-4 shrink-0">
          
          {/* Progress Section */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Profile Status
              </h3>
              <span className="text-base font-black text-gray-900 bg-white border border-gray-100 rounded-lg px-2 py-0.5 shadow-sm">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-gray-400 font-semibold leading-normal">
              {completionPercentage === 100
                ? "Perfect! Your profile is complete and listing channels are unfurled."
                : "Fill in all metrics fields to boost search parameters."}
            </p>
          </div>

          {/* Integrated Real-time Wizard Guardrails Info Box */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block">Branding Guardrails</span>
            <div className="bg-gradient-to-br from-blue-50/60 to-purple-50/50 border border-blue-100 rounded-2xl p-3.5 text-[10px] leading-relaxed text-blue-600 font-semibold space-y-1.5">
              <li>• Clean high-resolution logo graphics double incoming candidate metrics.</li>
              <li>• Verifiable digital links provide structural authority indexes.</li>
              <li>• Headquarters definitions guide local matching engine scripts.</li>
            </div>
          </div>

          {/* METRICS BADGES SUMMARY FOOTER ROW */}
          <div className="pt-2 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-gray-400">
            <div className="p-2 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center">
              <Target className="w-4 h-4 text-green-500 mb-1" />
              <span>Attract</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center">
              <Users className="w-4 h-4 text-blue-500 mb-1" />
              <span>Build</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center">
              <Star className="w-4 h-4 text-amber-500 mb-1" />
              <span>Scale</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CompanySetup