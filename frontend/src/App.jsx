import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";
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
      { path: "select-role", element: <SelectRole /> },

      {
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "jobs", element: <Jobs /> },
          { path: "description/:id", element: <JobDescription /> },
          { path: "browse", element: <Browse /> },
          { path: "profile", element: <Profile /> },
          { path: "saved", element: <SavedJobs /> },
          { path: "admin/companies", element: <Companies /> },
          { path: "admin/companies/create", element: <CompanyCreate /> },
          { path: "admin/companies/:id", element: <CompanySetup /> },
          { path: "admin/jobs", element: <AdminJobs /> },
          { path: "admin/jobs/create", element: <PostJob /> },
          { path: "admin/jobs/:id/applicants", element: <Applicants /> },
          { path: "resume/upload", element: <ResumeUpload/> },
          { path: "notifications", element: <Notification /> },
        ],
      },
    ],
  },
]);


function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
