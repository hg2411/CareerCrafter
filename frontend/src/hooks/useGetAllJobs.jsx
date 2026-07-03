// src/hooks/useGetAllJobs.js

import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => { 
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  const fetchAllJobs = useCallback(async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  }, [dispatch, searchedQuery]);

  // Automatically fetch on mount or when searchedQuery changes
  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  return fetchAllJobs; // Allow manual refetching (important for deletion)
};

export default useGetAllJobs;
