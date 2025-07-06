import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "./ui/badge";
import { NOTIFICATION_API_END_POINT } from "@/utils/constant";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${NOTIFICATION_API_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) {
          setNotifications(res.data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-2xl p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
          🔔 Notifications
        </h2>
        {notifications.length === 0 ? (
          <p className="text-gray-600 text-center mt-4">No notifications yet.</p>
        ) : (
          <ul className="space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pr-2">
            {notifications.map((notif) => (
              <li
                key={notif._id}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex justify-between items-center border border-gray-100"
              >
                <span className="text-gray-700 text-base">{notif.message}</span>
                <Badge className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                  {new Date(notif.createdAt).toLocaleDateString()}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification;
