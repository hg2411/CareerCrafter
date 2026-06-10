import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentChatsPage = () => {
  const { user } = useSelector((store) => store.auth);

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/chat/student/${user._id}`,
          {
            withCredentials: true,
          }
        );

        console.log(res.data);

        if (res.data.success) {
          console.log("Chats:", res.data.chats);
          setChats(res.data.chats);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchChats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium tracking-wide">
          Loading your conversations...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              My Chats
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your conversations with recruiters and hiring managers
            </p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100">
            {chats.filter((chat) => chat.recruiter).length} active{" "}
            {chats.filter((chat) => chat.recruiter).length === 1
              ? "chat"
              : "chats"}
          </span>
        </div>

        {/* Chats Content */}
        {chats.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No conversations yet
            </h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              When recruiters reach out to you or you initiate a conversation,
              they will appear right here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {chats
              .filter((chat) => chat.recruiter)
              .map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => navigate(`/chat/${chat.recruiter._id}`)}
                  className="group cursor-pointer bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={
                            chat.recruiter?.profilePhoto ||
                            `https://ui-avatars.com/api/?name=${chat.recruiter?.fullname || "User"}&background=4f46e5&color=fff`
                          }
                          alt={chat.recruiter?.fullname}
                          className="w-12 h-12 rounded-full object-cover border border-gray-100 ring-2 ring-transparent group-hover:ring-indigo-100 transition-all"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>

                      <div>
                        <h2 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {chat.recruiter?.fullname}
                        </h2>
                        <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            ></path>
                          </svg>
                          {chat.recruiter?.email}
                        </p>
                      </div>
                    </div>

                    <span className="text-gray-400 group-hover:text-indigo-500 transition-colors hidden sm:block">
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </span>
                  </div>

                  {chat.messages.length > 0 && (
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50 bg-gray-50/50 -mx-5 -mb-5 px-5 py-3 rounded-b-xl">
                      <p className="text-gray-600 text-sm truncate max-w-[70%] font-medium">
                        <span className="text-gray-400 font-normal">
                          Last message:{" "}
                        </span>
                        {chat.messages[chat.messages.length - 1]?.text}
                      </p>

                      <span className="text-xs text-gray-400 font-medium">
                        {new Date(
                          chat.messages[chat.messages.length - 1]?.createdAt
                        ).toLocaleDateString(undefined, {
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
  );
};

export default StudentChatsPage;