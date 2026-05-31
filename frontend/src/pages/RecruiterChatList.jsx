"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { User2, Loader, MessageCircle, ChevronRight } from "lucide-react"
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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Messages</h1>
          <p className="text-slate-600">Manage your conversations with candidates</p>
        </div>

        {/* Chat List Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header with count */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-slate-600" />
                <span className="font-semibold text-slate-900">All Conversations</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                {chats.length} {chats.length === 1 ? 'chat' : 'chats'}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Loading conversations...</p>
              </div>
            ) : chats.length === 0 ? (
              <div className="text-center py-20 px-6">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No conversations yet</h3>
                <p className="text-slate-600">
                  Start connecting with candidates to see your chats here
                </p>
              </div>
            ) : (
              chats.map((chat) => {
                const student = chat.student
                if (!student) return null

                return (
                  <Link 
                    key={chat._id} 
                    to={`/recruiter/chat/${student._id}`}
                    className="block hover:bg-slate-50 transition-colors"
                  >
                    <div className="px-6 py-4 flex items-center gap-4 group">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-14 h-14 border-2 border-white shadow-sm">
                          <AvatarImage
                            src={student.avatar || "/placeholder.svg?height=56&width=56"}
                            alt={student.fullname || "Student"}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                            {student.fullname?.charAt(0)?.toUpperCase() || <User2 className="w-6 h-6" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors mb-1">
                          {student.fullname || "Unnamed Student"}
                        </h3>
                        
                        <p className="text-sm text-slate-600 truncate mb-2">
                          {student.email}
                        </p>

                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                          Candidate
                        </Badge>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </div>

        {/* Footer Stats */}
        {/* {chats.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{chats.length}</div>
              <div className="text-sm text-slate-600">Total Chats</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {chats.filter(c => c.student).length}
              </div>
              <div className="text-sm text-slate-600">Active</div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default RecruiterChatList