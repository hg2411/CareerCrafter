"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { io } from "socket.io-client"
import Navbar from "../components/shared/Navbar"
import {
  MessageSquare,
  Mail,
  ChevronRight,
  Sparkles,
  Clock,
  Loader2,
} from "lucide-react"

const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
const socket = io(SOCKET_SERVER_URL, { withCredentials: true })

const StudentChatsPage = () => {
  const { user } = useSelector((store) => store.auth)
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `${SOCKET_SERVER_URL}/api/v1/chat/student/${user._id}`,
          {
            withCredentials: true,
          }
        )

        if (res.data.success) {
          setChats(res.data.chats)
        }
      } catch (error) {
        console.error("Failed to fetch student chats:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?._id) {
      fetchChats()
      // Join own room to listen for live updates/new messages
      socket.emit("joinRoom", { senderId: user._id, receiverId: user._id })
      socket.on("newMessage", () => {
        fetchChats()
      })
      return () => {
        socket.off("newMessage")
      }
    }
  }, [user?._id])

  if (loading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-gray-500 font-bold tracking-wide text-xs">
          Loading your conversations...
        </p>
      </div>
    )
  }

  const activeChatsCount = chats.filter((chat) => chat.recruiter).length

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
              <span className="text-[9px] font-bold tracking-wider uppercase">Messages</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              My Chats
            </h1>
            <p className="text-xs text-gray-400 font-semibold mt-1">
              Manage your conversations with recruiters and hiring managers
            </p>
          </div>
          <span className="self-center sm:self-auto bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 text-[11px] font-black px-3.5 py-1.5 rounded-full border border-orange-200/30 shadow-sm shrink-0">
            {activeChatsCount} {activeChatsCount === 1 ? "Active Chat" : "Active Chats"}
          </span>
        </div>

        {/* Chats Content */}
        {chats.length === 0 ? (
          <div className="bg-white/95 rounded-[24px] border border-gray-100 p-12 text-center shadow-xl backdrop-blur-md max-w-lg w-full mx-auto my-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-200/20">
              <MessageSquare className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-base font-black text-gray-900 mb-1">
              No conversations yet
            </h3>
            <p className="text-gray-400 text-xs max-w-sm mx-auto font-medium leading-relaxed">
              When recruiters reach out to you or you initiate a conversation,
              they will appear right here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4.5">
            {chats
              .filter((chat) => chat.recruiter)
              .map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => navigate(`/chat/${chat.recruiter._id}`)}
                  className="group cursor-pointer bg-white/95 border border-gray-100 rounded-[20px] p-5 hover:border-orange-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between backdrop-blur-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={
                            chat.recruiter?.profilePhoto ||
                            `https://ui-avatars.com/api/?name=${chat.recruiter?.fullname || "User"}&background=ff5e3a&color=fff`
                          }
                          alt={chat.recruiter?.fullname}
                          className="w-12 h-12 rounded-full object-cover border border-gray-100 ring-2 ring-transparent group-hover:ring-orange-100 transition-all"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>

                      <div className="min-w-0">
                        <h2 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                          {chat.recruiter?.fullname}
                        </h2>
                        <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-0.5 truncate font-semibold">
                          <Mail className="w-3.5 h-3.5 text-gray-300" />
                          {chat.recruiter?.email}
                        </p>
                      </div>
                    </div>

                    <span className="text-gray-300 group-hover:text-orange-500 transition-colors shrink-0">
                      <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {chat.messages.length > 0 && (
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50 bg-gray-50/50 -mx-5 -mb-5 px-5 py-3 rounded-b-[20px]">
                      <p className="text-gray-600 text-xs truncate max-w-[70%] font-semibold">
                        <span className="text-gray-400 font-normal">
                          Last message:{" "}
                        </span>
                        {chat.messages[chat.messages.length - 1]?.text}
                      </p>

                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-gray-300" />
                        {new Date(
                          chat.messages[chat.messages.length - 1]?.createdAt
                        ).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentChatsPage