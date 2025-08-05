import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOCKET_SERVER_URL = "http://localhost:8000";

const ChatPage = () => {
  const { receiverId } = useParams(); // recruiter id
  const { user } = useSelector((store) => store.auth); // student user
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

  return (
    <div className="max-w-4xl mx-auto my-6 flex flex-col h-[80vh] rounded-xl shadow-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white shadow">
        <h2 className="text-lg font-semibold">Chat with Recruiter</h2>
        <Smile className="w-5 h-5" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow 
              ${msg.senderId === user._id || msg.senderId?._id === user._id
                ? "ml-auto bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white"
                : "mr-auto bg-white text-gray-800 border border-gray-200"}`}
          >
            <p>{msg.text}</p>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-300">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-[10px] text-gray-400">
                {msg.senderId === user._id || msg.senderId?._id === user._id
                  ? "You"
                  : "Recruiter"}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex gap-2 items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#9D50BB] outline-none"
        />
        <Button
          onClick={handleSend}
          className="flex items-center justify-center bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white px-4 py-2 rounded-full hover:opacity-90 transition"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
