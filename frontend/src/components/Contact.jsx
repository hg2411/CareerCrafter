"use client"
import { Mail, MessageCircle, Send, User, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-30"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-25"></div>
      <div className="absolute bottom-20 right-40 w-16 h-16 bg-yellow-200 rounded-full opacity-40"></div>

      {/* Floating shapes */}
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-orange-400 rotate-45 animate-bounce"></div>
      <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-purple-400 rotate-45 animate-bounce delay-300"></div>

      <div className="relative z-10 flex flex-col items-center py-16 px-6">
        <div className="max-w-3xl w-full text-center">
          {/* Header Section */}
          <div className="mb-16">
            <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get In Touch
            </div>
            <h1 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Have questions or feedback? We'd love to hear from you! Fill out the form below and we'll get back to you
              as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <form className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8 md:p-12 space-y-8 transform hover:shadow-3xl transition-all duration-300">
            <div className="space-y-6">
              <div className="relative">
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-3">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-3">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-3">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    placeholder="Your Message"
                    rows={5}
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>

          {/* Additional Contact Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-6 group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">careercrafterofficial123@gmail.com</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-6 group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-6 group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">123 Career Street, Tech City</p>
            </div>
          </div>
        </div>
      </div>

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
