"use client"

import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import io from "socket.io-client"
import axios from "axios"
import { Send, Smile } from 'lucide-react'
import { Button } from "@/components/ui/button"

const SOCKET_SERVER_URL = "http://localhost:8000"

const ChatPage = () => {
  const { receiverId } = useParams()
  const { user } = useSelector((store) => store.auth)
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-30"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-25"></div>

      <div className="relative z-10 max-w-5xl mx-auto py-6 px-4">
        <div className="h-[90vh] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-lg">
                {getInitials("Recruiter")}
              </div>
              <div>
                <p className="text-lg font-semibold">CHATS</p>
              </div>
            </div>
            <Smile className="w-5 h-5 opacity-80" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-gray-50 to-white space-y-4 relative">
            {messages.map((msg, idx) => {
              const isUser = msg.senderId === user._id || msg.senderId?._id === user._id
              const sender = isUser ? "You" : "Recruiter"
              return (
                <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"} group`}>
                  <div className="flex gap-2 items-end max-w-[75%]">
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm flex items-center justify-center font-bold shadow-lg">
                        {getInitials(sender)}
                      </div>
                    )}
                    <div
                      className={`
                        px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl
                        ${
                          isUser
                            ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-br-none"
                            : "bg-white text-gray-800 border-2 border-gray-100 rounded-bl-none"
                        }
                      `}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className="text-[10px] text-gray-400 mt-1 text-right group-hover:opacity-100 opacity-0 transition-opacity">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t-2 border-gray-100 bg-white backdrop-blur-xl flex items-center gap-3 shadow-inner">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-full border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all duration-300"
            />
            <Button
              onClick={handleSend}
              className="rounded-full p-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white hover:scale-105 hover:shadow-xl transition-all duration-300"
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
