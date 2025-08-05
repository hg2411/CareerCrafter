"use client"

import { useState, useEffect } from "react"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import CompaniesTable from "./CompaniesTable"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "@/redux/companySlice"
import useGetAllCompany from "@/hooks/useGetAllCompany"
import { Search, Plus, Building, Sparkles, Filter, TrendingUp, Users, Star, BarChart3, Zap } from "lucide-react"

const Companies = () => {
  useGetAllCompany()
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input, dispatch])

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
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-gray-200">
            <Building className="w-5 h-5 mr-2 text-orange-500" />
            <span className="text-gray-700 font-semibold">Company Management</span>
          </div> */}
          <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Manage Your
            </span>
            <br />
            Companies 🏢
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create, manage, and track all your company profiles in one centralized dashboard.
          </p>
        </div>
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rotate-45"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Company Directory</span>
                  </div>
                  <h2 className="text-3xl font-black mb-2">Your Companies</h2>
                  <p className="text-white/90 text-lg">Manage and organize all your company profiles</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => navigate("/admin/companies/create")}
                    className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New Company
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="p-8 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search companies by name, industry, or location..."
                  className="pl-12 h-12 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-400 text-gray-900 placeholder-gray-400 bg-white shadow-sm"
                />
              </div>

              {/* Filter Options */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-2xl font-semibold bg-white"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-2xl font-semibold bg-white"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">18 Active Companies</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">6 Pending Approval</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">24 Total Companies</span>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 text-white" />
                </div>
                Company Directory
              </h3>
              <div className="text-sm text-gray-500">
                {input ? `Filtered results for "${input}"` : "Showing all companies"}
              </div>
            </div>

            <CompaniesTable />
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Add Company</h4>
                <p className="text-gray-600">Create a new company profile</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">View Analytics</h4>
                <p className="text-gray-600">Company performance metrics</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Bulk Actions</h4>
                <p className="text-gray-600">Manage multiple companies</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Companies
