import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Jobs from "./components/Jobs.jsx";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Browse from "./components/Browse.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDecription.jsx";
import Companies from "./components/admin/Companies.jsx";
import CompanyCreate from "./components/admin/CompanyCreate.jsx";
import CompanySetup from "./components/admin/CompanySetup.jsx";
import AdminJobs from "./components/admin/AdminJobs.jsx";
import PostJob from "./components/admin/PostJob.jsx";
import Applicants from "./components/admin/Applicants.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import SelectRole from "./pages/SelectRole.jsx";
import SavedJobs from "./components/SavedJobs.jsx";


// ✅ Layout with ToastContainer
const Layout = () => (
  <>
    <ToastContainer position="top-center" autoClose={3000} />{" "}
    {/* ✅ Add this */}
    <Outlet />
  </>
);

// Router setup
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "description/:id",
        element: <JobDescription />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // admin k liye yha se start ho rha h
      {
        path: "admin/companies",
        element:<ProtectedRoute><Companies /></ProtectedRoute>,
      },
      {
        path: "admin/companies/create",
        element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>,
      },
      {
        path: "admin/companies/:id",
        element:<ProtectedRoute> <CompanySetup /></ProtectedRoute>,
      },
      {
        path: "/admin/jobs",
        element:<ProtectedRoute> <AdminJobs /> </ProtectedRoute>,
      },
      {
        path: "/admin/jobs/create",
        element: <ProtectedRoute><PostJob/></ProtectedRoute>,
      },
      {
        path: "/admin/jobs/:id/applicants",
        element:<ProtectedRoute> <Applicants/></ProtectedRoute>,
      },
      {
        path: "select-role",
        element: <SelectRole />,
      },
      {
        path: "saved",
        element: <SavedJobs />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
