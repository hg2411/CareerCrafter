import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOCKET_SERVER_URL = "http://localhost:8000";

const ChatPage = () => {
  const { receiverId } = useParams();
  const { user } = useSelector((store) => store.auth);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const roomId = [user._id, receiverId].sort().join("_");

  useEffect(() => {
    const fetchOldMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/chat/${receiverId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.error("Failed to load old messages:", error);
      }
    };

    if (user?._id) fetchOldMessages();
  }, [receiverId, user?._id]);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current.emit("join", {
      senderId: user._id,
      receiverId,
      roomId,
    });

    socketRef.current.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [receiverId, user._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const newMessage = {
      senderId: user._id,
      receiverId,
      text,
      createdAt: new Date().toISOString(),
      student: user._id,
      recruiter: receiverId,
    };

    socketRef.current.emit("sendMessage", {
      ...newMessage,
      roomId,
    });

    setMessages((prev) => [...prev, newMessage]);
    setText('');

    try {
      await axios.post("http://localhost:8000/api/v1/chat/message", newMessage, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Failed to save message to DB", err);
    }
  };

  const getInitials = (name = "R") => {
    return name?.charAt(0).toUpperCase();
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 mb-10 h-[90vh] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
      
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white flex justify-between items-center shadow-md">
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
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-br from-gray-100 via-white to-gray-200 space-y-4 relative">
        {messages.map((msg, idx) => {
          const isUser = msg.senderId === user._id || msg.senderId?._id === user._id;
          const sender = isUser ? "You" : "Recruiter";

          return (
            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
              <div className="flex gap-2 items-end max-w-[75%]">
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#6A38C2] text-white text-sm flex items-center justify-center font-bold">
                    {getInitials(sender)}
                  </div>
                )}
                <div
                  className={`
                    px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm 
                    ${isUser
                      ? 'bg-gradient-to-br from-[#6A38C2] to-[#9D50BB] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}
                  `}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className="text-[10px] text-gray-400 mt-1 text-right group-hover:opacity-100 opacity-0 transition-opacity">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white backdrop-blur-xl flex items-center gap-3 shadow-inner">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#9D50BB] outline-none transition"
        />
        <Button
          onClick={handleSend}
          className="rounded-full p-3 bg-gradient-to-br from-[#6A38C2] to-[#9D50BB] text-white hover:scale-105 hover:shadow-lg transition"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
