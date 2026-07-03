import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const [checkingAuth, setCheckingAuth] = useState(!user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/auth/me", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        } else {
          const justLoggedOut = sessionStorage.getItem("justLoggedOut");
          if (location.pathname !== "/login" && !justLoggedOut) {
            toast.error("Please login/signup to access this page");
          }
          sessionStorage.removeItem("justLoggedOut");
          navigate("/login", { state: { from: location }, replace: true });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        const justLoggedOut = sessionStorage.getItem("justLoggedOut");
        if (location.pathname !== "/login" && !justLoggedOut) {
          toast.error("Please login/signup to access this page");
        }
        sessionStorage.removeItem("justLoggedOut");
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [user, navigate, location, dispatch]);

  if (checkingAuth) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-gray-500 font-bold tracking-wide text-xs">
          Verifying your session...
        </p>
      </div>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;
