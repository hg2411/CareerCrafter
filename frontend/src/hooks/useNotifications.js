// hooks/useGetNotifications.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const useGetNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/notifications/get", {
          withCredentials: true,
        });
        if (res.data.success) setNotifications(res.data.notifications);
      } catch (err) {
        console.log("Notification error:", err);
      }
    };
    fetch();
  }, []);

  return notifications;
};

export default useGetNotifications;
