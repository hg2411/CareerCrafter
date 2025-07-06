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
    <div className="min-h-screen bg-gray-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-100 rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">🔔 Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-600 text-center">No notifications yet.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif) => (
              <li
                key={notif._id}
                className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow flex justify-between items-center border border-gray-200"
              >
                <span className="text-gray-700">{notif.message}</span>
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
