"use client"

import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import io from "socket.io-client"
import { Send, ArrowLeft, Loader2, Sparkles, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "../components/shared/Navbar"
import { BASE_URL } from "@/utils/constant"

const SOCKET_SERVER_URL = BASE_URL

const RecruiterChatPage = () => {
  const { receiverId } = useParams()
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [receiver, setReceiver] = useState(null)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)
  const socketRef = useRef(null)

  const roomId = [user._id, receiverId].sort().join("_")

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(
          `${SOCKET_SERVER_URL}/api/v1/chat/${receiverId}`,
          { withCredentials: true }
        )
        setMessages(res.data.messages || [])
      } catch (error) {
        console.error("Error fetching chat:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?._id) fetchChat()
  }, [receiverId, user?._id])

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      withCredentials: true,
    })

    socketRef.current.emit("joinRoom", {
      senderId: user._id,
      receiverId,
    })

    socketRef.current.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [receiverId, user._id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`${SOCKET_SERVER_URL}/api/v1/user/${receiverId}`)
        setReceiver(res.data.user)
      } catch (error) {
        console.error("Failed to fetch receiver profile:", error)
      }
    }
    if (receiverId) fetchReceiver()
  }, [receiverId])

  const handleSend = async () => {
    if (!text.trim()) return

    const newMessage = {
      senderId: user._id,
      receiverId,
      text,
      createdAt: new Date().toISOString(),
      recruiter: user._id,
      student: receiverId,
    }

    socketRef.current.emit("sendMessage", newMessage)
    setMessages((prev) => [...prev, newMessage])
    setText("")

    try {
      await axios.post(
        `${SOCKET_SERVER_URL}/api/v1/chat/message`,
        newMessage,
        { withCredentials: true }
      )
    } catch (err) {
      console.error("Failed to save message to DB", err)
    }
  }

  const getInitials = (name = "S") => {
    return name?.charAt(0).toUpperCase()
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-gray-500 font-bold tracking-wide text-xs">
          Opening secure chat tunnel...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-gray-900 relative overflow-hidden antialiased font-sans flex flex-col">
      {/* Decorative Brand Ambience Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      <Navbar />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col overflow-hidden">
        {/* Main Glass Chat Card */}
        <div className="flex-1 bg-white/95 rounded-[24px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden backdrop-blur-md">
          {/* Header */}
          <div className="bg-white/90 border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 shrink-0 shadow-sm">
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-orange-500/5 text-gray-500 hover:text-orange-600 rounded-xl transition-all border border-gray-100 shadow-sm bg-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-black text-base shadow-md">
                  {getInitials(receiver?.fullname)}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              <div>
                <h2 className="text-sm font-black text-gray-900 leading-tight">
                  {receiver?.fullname || "Candidate"}
                </h2>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active now</p>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 rounded-full border border-orange-200/30 text-[9px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-orange-500" /> Secure Chat
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gray-50/20">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-xs mx-auto space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full flex items-center justify-center border border-orange-200/20 shadow-inner">
                  <MessageSquare className="w-6 h-6 text-orange-500 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900">No messages yet</h3>
                  <p className="text-gray-400 text-xs font-semibold mt-0.5">
                    Start your secure conversation below by sending a greeting.
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => {
              const isYou = msg.senderId === user._id || msg.senderId?._id === user._id
              const showAvatar = idx === 0 || messages[idx - 1]?.senderId !== msg.senderId

              return (
                <div key={idx} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3.5 items-end max-w-[75%] ${isYou ? "flex-row-reverse" : ""}`}>
                    {!isYou && (
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white text-xs flex items-center justify-center font-black shadow-md shrink-0 ${showAvatar ? "visible" : "invisible"}`}>
                        {getInitials(receiver?.fullname)}
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <div
                        className={`
                          px-4 py-2.5 rounded-2xl shadow-sm text-xs font-semibold leading-relaxed
                          ${isYou
                            ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-br-none border border-pink-500/10"
                            : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                          }
                        `}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className={`text-[9px] text-gray-400 font-bold px-1 ${isYou ? "text-right" : ""}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-100 px-6 py-4 shrink-0">
            <div className="flex items-end gap-3.5">
              <div className="flex-1 relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Type your message here..."
                  rows={1}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none resize-none transition-all bg-gray-50/50 text-xs font-semibold text-gray-900 placeholder-gray-400"
                  style={{
                    minHeight: "44px",
                    maxHeight: "120px",
                  }}
                />
              </div>

              <Button
                onClick={handleSend}
                disabled={!text.trim()}
                className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-pink-500/10 flex items-center justify-center active:scale-95 shrink-0 mb-0.5"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterChatPage
