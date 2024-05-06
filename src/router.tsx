import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage.js";

import { useAuth } from "./AuthContext.js";
import { Admin } from "./pages/Admin.js";
import { Login } from "./pages/Login.js";
import { Register } from "./pages/Register.js";
import { Activity } from "./pages/Activity.js";
import { ListCapters } from "./pages/ListCapters.js";
import { ForgotPassword } from "./pages/ForgotPassword.js";
import { VerifyCode } from "./pages/VerifyCode.js";
import { ChangePassword } from "./pages/ChangePassword.js";

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
