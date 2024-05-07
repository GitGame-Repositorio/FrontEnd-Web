import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { useAuth } from "./AuthContext";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Activity } from "./pages/Activity";
import { ListCapters } from "./pages/ListCapters";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { VerifyCode } from "./pages/auth/VerifyCode";
import { ChangePassword } from "./pages/auth/ChangePassword";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recovery-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/all-capters",
    element: <ListCapters />,
  },
  {
    path: "/activity",
    element: <Activity />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

const Router = () => {
  //   const { isLogged } = useAuth();
  return <RouterProvider router={publicRoutes} />;
};

export default Router;
