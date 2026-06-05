"use client"

import { Link } from "react-router-dom"
import { Linkedin, Github, Heart, Sparkles, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mt-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-orange-500/10 rounded-full"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-pink-500/10 rounded-full"></div>
      <div className="absolute bottom-10 left-20 w-20 h-20 bg-purple-500/10 rounded-full"></div>

      {/* Floating shapes */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-400 rotate-45 animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-400 rotate-45 animate-pulse delay-300"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>

              <h3 className="text-2xl font-black text-white">
                Career
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Crafter
                </span>
              </h3>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-md">
              Helping you craft your career with the right opportunities,
              guidance, and connections for your growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-sm">careercrafterofficial123@gmail.com</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">Prayagraj, Uttar Pradesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-5 bg-gradient-to-b from-orange-400 to-pink-400 rounded-full"></div>
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/jobs"
                  className="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-5 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full"></div>
              Follow Us
            </h3>

            <div className="flex gap-3">
              <a
                href="https://github.com/hg2411/CareerCrafter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Github className="w-4 h-4 text-gray-300 group-hover:text-white" />
              </a>

              <a
                href="https://www.linkedin.com/in/hg2411/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
              <p className="text-gray-400 text-xs md:text-sm">
                Made with love by the CareerCrafter team
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
              >
                Terms of Service
              </Link>

              <p className="text-gray-400 text-xs md:text-sm text-center">
                © {new Date().getFullYear()} CareerCrafter. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer