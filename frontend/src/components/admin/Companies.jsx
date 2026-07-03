"use client"

import { useState, useEffect } from "react"
import Navbar from "../shared/Navbar"

import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import useGetCompany from "@/hooks/useGetCompany"
import {  Plus, Sparkles } from "lucide-react"
import CompanyCard from "./CompanyCard"

const Companies = () => {
  useGetCompany()

  const navigate = useNavigate()
  const { singleCompany } = useSelector((store) => store.company);


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
        {/* <div className="text-center mb-12">

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
        </div> */}

           

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
                  <h2 className="text-3xl font-black mb-2">My Company</h2>
                  <p className="text-white/90 text-lg">Manage and organize  your company profiles</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {!singleCompany && (
                    <Button
                      onClick={() => navigate("/admin/companies/create")}
                      className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl shadow-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Company
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
                 <CompanyCard singleCompany={singleCompany} />
        </div>
      </div>
    </div>
    
  )
}

export default Companies
