import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const justLoggedOut = sessionStorage.getItem("justLoggedOut");

    if (!user) {
      // Show toast only if not just logged out
      if (location.pathname !== "/login" && !justLoggedOut) {
        toast.error("Please login/signup to access this page");
      }

      sessionStorage.removeItem("justLoggedOut"); // clean up
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [user, navigate, location]);

  // Show nothing until check completes, or always show children if user exists
  return user ? children : null;
};

export default ProtectedRoute;
