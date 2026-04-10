"use client"

import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import io from "socket.io-client"
import axios from "axios"
import { Send, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const SOCKET_SERVER_URL = "http://localhost:8000"

const ChatPage = () => {
  const { receiverId } = useParams()
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const messagesEndRef = useRef(null)
  const socketRef = useRef(null)
  const roomId = [user._id, receiverId].sort().join("_")

  useEffect(() => {
    const fetchOldMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/chat/${receiverId}`, {
          withCredentials: true,
        })
        if (res.data.success) {
          setMessages(res.data.messages)
        }
      } catch (error) {
        console.error("Failed to load old messages:", error)
      }
    }
    if (user?._id) fetchOldMessages()
  }, [receiverId, user?._id])

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      withCredentials: true,
    })

    socketRef.current.emit("join", {
      senderId: user._id,
      receiverId,
      roomId,
    })

    socketRef.current.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socketRef.current.disconnect()
      socketRef.current = null
    }
  }, [receiverId, user._id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!text.trim()) return

    const newMessage = {
      senderId: user._id,
      receiverId,
      text,
      createdAt: new Date().toISOString(),
      student: user._id,
      recruiter: receiverId,
    }

    socketRef.current.emit("sendMessage", {
      ...newMessage,
      roomId,
    })

    setMessages((prev) => [...prev, newMessage])
    setText("")

    try {
      await axios.post("http://localhost:8000/api/v1/chat/message", newMessage, {
        withCredentials: true,
      })
    } catch (err) {
      console.error("Failed to save message to DB", err)
    }
  }

  const getInitials = (name = "R") => {
    return name?.charAt(0).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                  {getInitials("Recruiter")}
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Recruiter</h2>
                <p className="text-sm text-slate-500">Active now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-50">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                <Send className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No messages yet</h3>
              <p className="text-slate-500">Start the conversation by sending a message!</p>
            </div>
          )}

          {messages.map((msg, idx) => {
            const isUser = msg.senderId === user._id || msg.senderId?._id === user._id
            const showAvatar = idx === 0 || messages[idx - 1]?.senderId !== msg.senderId
            
            return (
              <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 items-end max-w-[70%] ${isUser ? "flex-row-reverse" : ""}`}>
                  {!isUser && (
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm flex items-center justify-center font-semibold shadow-sm ${showAvatar ? "visible" : "invisible"}`}>
                      {getInitials("Recruiter")}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1">
                    <div
                      className={`
                        px-4 py-2.5 rounded-2xl shadow-sm
                        ${
                          isUser
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                        }
                      `}
                    >
                      <p className="text-[15px] leading-relaxed">{msg.text}</p>
                    </div>
                    <span className={`text-xs text-slate-500 px-1 ${isUser ? "text-right" : ""}`}>
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
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="flex items-end gap-3">
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
                placeholder="Type a message..."
                rows={1}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none transition-all bg-slate-50"
                style={{
                  minHeight: "44px",
                  maxHeight: "120px",
                }}
              />
            </div>

            <Button
              onClick={handleSend}
              disabled={!text.trim()}
              className="rounded-full p-3 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg mb-1"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage