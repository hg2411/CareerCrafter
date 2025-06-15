// useGetAllCompany.jsx
import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompany = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                } else {
                    dispatch(setCompanies([])); // In case API returns success: false
                }
            } catch (error) {
                console.log("Error fetching companies:", error);
                dispatch(setCompanies([])); // Clear redux on error
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, [dispatch]);

    return { loading, error }; // Must return these to handle in component
};

export default useGetAllCompany;
