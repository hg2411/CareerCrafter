import { useEffect, useState } from "react";
import axios from "axios";

const useGetStats = () => {
  const [stats, setStats] = useState({ activeUsers: 0, recruiters: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const fetchStats = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/stats");
        console.log("Fetched stats:", data); // debug
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    intervalId = setInterval(fetchStats, 10000); // fetch every 10 sec

    return () => clearInterval(intervalId);
  }, []);

  return { stats, loading };
};

export default useGetStats;
