import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
]);
