"use client"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white">
                Career
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Crafter
                </span>
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Helping you craft your career with the right opportunities, guidance, and connections for your growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-sm">contact@careercrafter.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-pink-400" />
                <span className="text-sm">8105614228</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">Prayagraj,Uttar Pradesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-orange-400 to-pink-400 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/jobs"
                  className="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full"></div>
              Follow Us
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://github.com/hg2411/CareerCrafter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/hg2411/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>

            {/* Newsletter */}
            {/* <div>
              <p className="text-gray-300 text-sm mb-3">Stay updated with our latest opportunities</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-orange-400 transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
              <p className="text-gray-400 text-sm">Made with love by the CareerCrafter team</p>
            </div>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} CareerCrafter. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
