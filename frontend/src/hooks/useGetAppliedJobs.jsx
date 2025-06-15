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
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                } else {
                    setError("Failed to fetch applied jobs.");
                }
            } catch (error) {
                console.log(error);
                setError("An error occurred while fetching applied jobs.");
            } finally {
                setLoading(false);
            }
        };
        fetchAppliedJobs();
    }, [dispatch]);

    return { loading, error };
};

export default useGetAppliedJobs;
