import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOCKET_SERVER_URL = "http://localhost:8000";

const RecruiterChatPage = () => {
  const { receiverId } = useParams();
  const { user } = useSelector((store) => store.auth);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const roomId = [user._id, receiverId].sort().join("_");

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/chat/${receiverId}`,
          { withCredentials: true }
        );
        setMessages(res.data.messages || []);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    if (user?._id) fetchChat();
  }, [receiverId, user?._id]);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current.emit("joinRoom", {
      senderId: user._id,
      receiverId,
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
      recruiter: user._id,
      student: receiverId,
    };

    socketRef.current.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setText("");

    try {
      await axios.post(
        "http://localhost:8000/api/v1/chat/message",
        newMessage,
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to save message to DB", err);
    }
  };

  const getInitials = (name = "S") => name.charAt(0).toUpperCase();

  return (
    <div className="max-w-5xl mx-auto my-8 flex flex-col h-[90vh] rounded-3xl shadow-2xl border border-gray-200 bg-white overflow-hidden">
      
      {/* Header — only student shown */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#38A169] to-[#68D391] text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
            {getInitials("Student")}
          </div>
          <div>
            <p className="text-lg font-semibold">Student</p>
            <p className="text-xs text-white/80"></p>
          </div>
        </div>
        <Smile className="w-5 h-5 opacity-80" />
      </div>

      {/* Messages */}
      <div
        id="chatScrollBox"
        className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-100 via-white to-gray-200 space-y-4 relative"
      >
        {messages.map((msg, idx) => {
          const isYou = msg.senderId === user._id || msg.senderId?._id === user._id;

          return (
            <div key={idx} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
              <div className="flex gap-2 max-w-[75%] items-end">
                {!isYou && (
                  <div className="w-8 h-8 bg-[#38A169] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {getInitials("Student")}
                  </div>
                )}

                <div
                  className={`px-4 py-3 rounded-2xl shadow-md text-sm 
                    ${isYou
                      ? "bg-gradient-to-br from-[#38A169] to-[#68D391] text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                >
                  <p>{msg.text}</p>
                  <div className="text-[10px] text-gray-400 mt-1 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <span className="ml-1">{isYou ? "You" : "Student"}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center gap-3 shadow-inner">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#38A169] outline-none transition"
        />
        <Button
          onClick={handleSend}
          className="rounded-full p-3 bg-gradient-to-br from-[#38A169] to-[#68D391] text-white hover:scale-105 hover:shadow-lg transition"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default RecruiterChatPage;
