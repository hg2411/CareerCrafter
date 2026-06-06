import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log("Error fetching company:", error);
      }
    };

    fetchCompany();
  }, [dispatch]);
};

export default useGetCompany;