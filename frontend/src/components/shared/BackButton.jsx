import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const noBackPaths = [
    "/",
    "/jobs",
    "/saved",
    "/profile",
    "/admin/companies",
    "/admin/jobs",
    "/admin/profile",
    "/recruiter/chats",
  ];

  if (noBackPaths.includes(location.pathname)) return null;

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="fixed left-4 top-24 z-50 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-md transition hover:bg-slate-50 md:left-6 md:top-24"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
};

export default BackButton;
