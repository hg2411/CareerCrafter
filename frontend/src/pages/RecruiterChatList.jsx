"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { User2, Loader, MessageCircle, TrendingUp, Users, Mail, Clock } from "lucide-react"
import { io } from "socket.io-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Connect to socket server
const socket = io("http://localhost:8000", { withCredentials: true })

const RecruiterChatList = () => {
  const { user } = useSelector((state) => state.auth)
// recruiter user
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchChats = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/chat/recruiter/${user._id}`, { withCredentials: true })
      setChats(res.data.chats || [])
    } catch (err) {
      console.error("Failed to load chat list:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?._id) {
      fetchChats()
      // Join own room to listen for updates
      socket.emit("joinRoom", user._id)
      socket.on("newMessage", () => {
        fetchChats()
      })
      return () => {
        socket.off("newMessage")
      }
    }
  }, [user?._id])

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

      <div className="relative z-10 max-w-4xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Recruiter Dashboard
          </div> */}
          {/* <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-gray-900">Your Chats </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Chats
            </span>
          </h1> */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with talented candidates and manage all your recruitment conversations
          </p>
        </div>

        {/* Stats Section */}
        {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              count: `${chats.length}`,
              label: "Active Chats",
              icon: MessageCircle,
              gradient: "from-orange-400 to-pink-500",
              bg: "bg-orange-50",
            },
            {
              count: `${chats.filter((chat) => chat.student).length}`,
              label: "Students",
              icon: Users,
              gradient: "from-pink-400 to-purple-500",
              bg: "bg-pink-50",
            },
            {
              count: "24/7",
              label: "Available",
              icon: Mail,
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
        </div> */}

        {/* Main Chat List */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Your Chats</h2>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6" />
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{chats.length} conversations</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-spin mb-6 flex items-center justify-center">
                  <Loader className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">Loading conversations...</h3>
                <p className="text-gray-500">Please wait while we fetch your chats</p>
              </div>
            ) : chats.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No chats yet</h3>
                <p className="text-gray-600 text-lg">
                  Start connecting with talented candidates to see your conversations here
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {chats.map((chat) => {
                  const student = chat.student
                  if (!student) return null

                  return (
                    <div key={chat._id}>
                      <Link to={`/chat/${student._id}`} className="block">
                        <div className="flex items-center p-6 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-orange-200 group transform hover:-translate-y-1">
                          <div className="relative">
                            <Avatar className="w-16 h-16 border-2 border-gray-200 group-hover:border-orange-300 transition-all duration-300 shadow-lg">
                              <AvatarImage
                                src={student.avatar || "/placeholder.svg?height=64&width=64"}
                                alt={student.fullname || "Student"}
                              />
                              <AvatarFallback className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-lg">
                                <User2 className="h-8 w-8" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full shadow-lg"></div>
                          </div>

                          <div className="flex-1 ml-6 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-xl text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                                {student.fullname || "Unnamed Student"}
                              </h3>
                              <span className="text-sm text-gray-500 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                Active
                              </span>
                            </div>

                            <div className="flex items-center mb-3">
                              <Mail className="w-4 h-4 text-gray-400 mr-2" />
                              <p className="text-sm text-gray-600 truncate">{student.email}</p>
                            </div>

                            <div className="flex items-center">
                              <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 hover:from-blue-200 hover:to-purple-200 text-xs">
                                Student
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
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

export default RecruiterChatList
