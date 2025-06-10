// App.jsx
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Jobs from "./components/Jobs.jsx";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Layout with ToastContainer
const Layout = () => (
  <>
    <ToastContainer position="top-center" autoClose={3000} /> {/* ✅ Add this */}
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
        path:"jobs",
        element:<Jobs/>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
