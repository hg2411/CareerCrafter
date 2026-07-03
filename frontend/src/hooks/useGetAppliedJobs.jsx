import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        console.log("Fetched Applications:", res.data);

        if (res.data.success && Array.isArray(res.data.applications)) {
          dispatch(setAllAppliedJobs(res.data.applications));
        } else {
          dispatch(setAllAppliedJobs([])); // Clear if no jobs
          setError(res.data.message || "No applications found.");
        }
      } catch (error) {
        console.error("Applied Jobs Error:", error);
        dispatch(setAllAppliedJobs([])); // Clear state on error
        setError("Failed to fetch applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAppliedJobs;
