import { useEffect, useState } from "react";
import axios from "axios";

const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/auth/me", {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Not logged in:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuthUser;
