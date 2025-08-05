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

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    const fields = [input.name, input.description, input.website, input.location]
    const filledFields = fields.filter((field) => field && field.trim()).length
    return Math.round((filledFields / fields.length) * 100)
  }

  const completionPercentage = getCompletionPercentage()

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <Button
            type="button"
            onClick={() => navigate("/admin/companies")}
            className="mb-6 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Companies
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-gray-200">
              <Building className="w-5 h-5 mr-2 text-orange-500" />
              <span className="text-gray-700 font-semibold">Company Profile Setup</span>
            </div>

            <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Complete Your
              </span>
              <br />
              Company Profile 🏢
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Add detailed information about your company to attract the best talent and showcase your brand.
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Profile Completion</h3>
            <span className="text-2xl font-black text-gray-900">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completionPercentage === 100
              ? "Perfect! Your profile is complete."
              : "Fill in all fields to complete your profile."}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rotate-45"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Company Information</span>
              </div>
              <h2 className="text-3xl font-black mb-2">Setup Your Company</h2>
              <p className="text-white/90 text-lg">Complete your company profile to start attracting top talent</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={submitHandler} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      Company Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={changeEventHandler}
                      placeholder="e.g. OpenAI, Google, Microsoft"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      Location
                    </Label>
                    <Input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="e.g. San Francisco, New York, Remote"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      Website
                    </Label>
                    <Input
                      type="text"
                      name="website"
                      value={input.website}
                      onChange={changeEventHandler}
                      placeholder="e.g. https://openai.com"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Company Logo */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <Upload className="w-4 h-4 text-gray-500" />
                      Company Logo
                    </Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                    {input.file && (
                      <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {input.file.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    Company Description
                  </Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    placeholder="e.g. AI Research Company focused on developing safe artificial intelligence"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-500">Describe what your company does and what makes it unique</p>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-blue-800 font-semibold text-sm mb-2">Profile Tips</h4>
                    <ul className="text-blue-600 text-sm space-y-1">
                      <li>• Use a high-quality logo that represents your brand</li>
                      <li>• Write a compelling description that highlights your company culture</li>
                      <li>• Include your website to build credibility with candidates</li>
                      <li>• Be specific about your location or remote work options</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                {loading ? (
                  <Button
                    disabled
                    className="w-full h-14 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg opacity-50 cursor-not-allowed"
                  >
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Updating Company Profile...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <CheckCircle className="mr-2 h-6 w-6" />
                    Update Company Profile
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Attract Talent</h4>
                <p className="text-gray-600">Stand out to qualified candidates</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Build Team</h4>
                <p className="text-gray-600">Find the right people for your company</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Brand Building</h4>
                <p className="text-gray-600">Enhance your company reputation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanySetup
