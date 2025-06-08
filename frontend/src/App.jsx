import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx"; 
import React from "react";

// Layout without Navbar
const Layout = () => (
  <>
    <Outlet />
  </>
);

// Router setup
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout without Navbar
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
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
