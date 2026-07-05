"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { User2, Loader2, MessageCircle, ChevronRight, Sparkles, Mail } from "lucide-react"
import { io } from "socket.io-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Navbar from "../components/shared/Navbar"
import { BASE_URL } from "@/utils/constant"

const SOCKET_SERVER_URL = BASE_URL
const socket = io(SOCKET_SERVER_URL, { withCredentials: true })

const RecruiterChatList = () => {
  const { user } = useSelector((state) => state.auth)
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchChats = async () => {
    try {
      const res = await axios.get(`${SOCKET_SERVER_URL}/api/v1/chat/recruiter/${user._id}`, {
        withCredentials: true,
      })
      setChats(res.data.chats || [])
    } catch (err) {
      console.error("Failed to load recruiter chat list:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?._id) {
      fetchChats()
      // Join own room to listen for updates
      socket.emit("joinRoom", { senderId: user._id, receiverId: user._id })
      socket.on("newMessage", () => {
        fetchChats()
      })
      return () => {
        socket.off("newMessage")
      }
    }
  }, [user?._id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-gray-900 relative overflow-x-hidden antialiased font-sans flex flex-col">
      {/* Decorative Brand Ambience Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      <Navbar />

      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-200/60 pb-6">
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 rounded-full px-2.5 py-0.5 mb-2 border border-orange-200/30">
              <Sparkles className="w-3 h-3 mr-1.5 text-orange-500" />
              <span className="text-[9px] font-bold tracking-wider uppercase">Recruiter Inbox</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Messages
            </h1>
            <p className="text-xs text-gray-400 font-semibold mt-1">
              Manage your conversations with candidates
            </p>
          </div>
          <span className="self-center sm:self-auto bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 text-[11px] font-black px-3.5 py-1.5 rounded-full border border-orange-200/30 shadow-sm shrink-0">
            {chats.length} {chats.length === 1 ? "Active Conversation" : "Active Conversations"}
          </span>
        </div>

        {/* Chat List Container */}
        <div className="bg-white/95 rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-md flex-1 flex flex-col">
          {/* Header with icon */}
          <div className="px-6 py-4 border-b border-gray-100/60 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-xs uppercase tracking-wider text-gray-600">All Conversations</span>
            </div>
          </div>

          {/* Content */}
          <div className="divide-y divide-gray-100 flex-1 flex flex-col">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 flex-1">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                <p className="text-gray-500 font-bold tracking-wide text-xs">Loading conversations...</p>
              </div>
            ) : chats.length === 0 ? (
              <div className="text-center py-20 px-6 flex-1 flex flex-col items-center justify-center max-w-xs mx-auto space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full flex items-center justify-center border border-orange-200/20 shadow-inner">
                  <MessageCircle className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 mb-1">No conversations yet</h3>
                  <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                    Start connecting with candidates to see your chats here.
                  </p>
                </div>
              </div>
            ) : (
              chats.map((chat) => {
                const student = chat.student
                if (!student) return null

                return (
                  <Link 
                    key={chat._id} 
                    to={`/recruiter/chat/${student._id}`}
                    className="block hover:bg-orange-500/5 transition-colors"
                  >
                    <div className="px-6 py-5 flex items-center gap-4 group">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-14 h-14 border-2 border-white shadow-sm ring-1 ring-gray-100">
                          <AvatarImage
                            src={student.avatar || student.profilePhoto}
                            alt={student.fullname || "Student"}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white font-black text-lg">
                            {student.fullname?.charAt(0)?.toUpperCase() || <User2 className="w-5 h-5" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 w-4.5 h-4.5 bg-green-500 border-3 border-white rounded-full"></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors mb-0.5">
                          {student.fullname || "Unnamed Candidate"}
                        </h3>
                        
                        <p className="text-xs text-gray-400 font-semibold truncate flex items-center gap-1.5 mb-2">
                          <Mail className="w-3.5 h-3.5 text-gray-300" />
                          {student.email}
                        </p>

                        <Badge variant="outline" className="text-[9px] font-black px-2.5 py-0.5 rounded border uppercase tracking-wider bg-orange-50 border-orange-100 text-orange-700">
                          Candidate
                        </Badge>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterChatList