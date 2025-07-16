import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User2, Loader } from "lucide-react";

const RecruiterChatList = () => {
  const { user } = useSelector((state) => state.auth); // recruiter user
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/chat/recruiter/${user._id}`,
          { withCredentials: true }
        );
        setChats(res.data.chats || []);
      } catch (err) {
        console.error("Failed to load chat list:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchChats();
  }, [user?._id]);

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Chats</h2>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader className="animate-spin text-purple-600" />
        </div>
      ) : chats.length === 0 ? (
        <p className="text-gray-500">No chats yet.</p>
      ) : (
        <ul className="space-y-3">
          {chats.map((chat) => {
            // pick student info
            const student = chat.participants.find(
              (p) => p._id !== user._id
            );

            return (
              <li key={chat._id}>
                <Link
                  to={`/chat/${student._id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition"
                >
                  <User2 className="text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {student?.fullname || "Unnamed Student"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {student?.email}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RecruiterChatList;
