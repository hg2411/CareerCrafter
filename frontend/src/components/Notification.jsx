import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  getAllNotifications,
  markAllNotificationsAsRead,
} from "@/redux/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector((store) => store.notification);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
            🔔 Notifications
          </h2>
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full transition"
            >
              Mark all read
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-600 text-center mt-4">Loading notifications...</p>
        ) : error ? (
          <p className="text-red-600 text-center mt-4">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-600 text-center mt-4">No notifications yet.</p>
        ) : (
          <ul className="space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pr-2">
            {notifications.map((notif) => (
              <li
                key={notif._id}
                className={`p-4 rounded-xl shadow-md transition-all flex justify-between items-center border-2 ${
                  notif.isRead ? "bg-white border-gray-100" : "bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200"
                }`}
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
