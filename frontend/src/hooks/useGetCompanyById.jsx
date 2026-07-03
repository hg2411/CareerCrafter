import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn("Company not found — maybe deleted?");
        } else {
          console.error("Fetch error:", error);
        }
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
