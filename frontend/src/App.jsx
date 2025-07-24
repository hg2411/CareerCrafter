import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Jobs from "./components/Jobs.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import Companies from "./components/admin/Companies.jsx";
import CompanyCreate from "./components/admin/CompanyCreate.jsx";
import CompanySetup from "./components/admin/CompanySetup.jsx";
import AdminJobs from "./components/admin/AdminJobs.jsx";
import PostJob from "./components/admin/PostJob.jsx";
import Applicants from "./components/admin/Applicants.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import SelectRole from "./pages/SelectRole.jsx";
import SavedJobs from "./components/SavedJobs.jsx";
import ResumeUpload from "./components/ResumeUpload.jsx";
import Notification from "./components/Notification.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AdminProfile from "./components/admin/AdminProfile.jsx";
import ChatPage from "./pages/ChatPage.jsx"; 
import RecruiterChatPage from "./pages/RecruiterChatPage.jsx";
import RecruiterChatList from "./pages/RecruiterChatList.jsx";

// ✅ Layout with ToastContainer
const Layout = () => (
  <>
    <ToastContainer position="top-center" autoClose={3000} />
    <Outlet />
  </>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "first-time-setup", element: <SelectRole /> },

      // ✅ Forgot password flow (public, no login required)
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-otp", element: <VerifyOTP /> },
      { path: "reset-password", element: <ResetPassword /> },

      {
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "jobs", element: <Jobs /> },
          { path: "description/:id", element: <JobDescription /> },
          { path: "profile", element: <Profile /> },
          { path: "saved", element: <SavedJobs /> },
          { path: "admin/companies", element: <Companies /> },
          { path: "admin/companies/create", element: <CompanyCreate /> },
          { path: "admin/companies/:id", element: <CompanySetup /> },
          { path: "admin/jobs", element: <AdminJobs /> },
          { path: "admin/jobs/create", element: <PostJob /> },
          { path: "admin/jobs/:id/applicants", element: <Applicants /> },
          { path: "admin/chats", element: <RecruiterChatList /> },
          { path: "resume/upload", element: <ResumeUpload /> },
          { path: "notifications", element: <Notification /> },
          { path: "admin/profile", element: <AdminProfile /> },
          { path: "chat/:receiverId", element: <ChatPage /> },
          { path: "recruiter/chat/:receiverId", element: <RecruiterChatPage /> },
          { path :"recruiter/chat-list", element: <RecruiterChatList /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
