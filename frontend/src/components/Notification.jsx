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
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li key={notif._id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <span>{notif.message}</span>
              <Badge className="bg-blue-600 text-white">{new Date(notif.createdAt).toLocaleDateString()}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
